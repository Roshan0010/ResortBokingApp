const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/User');
const Place= require('./models/Place');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/Booking');

const cloudinary = require('cloudinary').v2; // Import Cloudinary
// Configure Cloudinary (replace 'your_cloud_name', 'your_api_key', and 'your_api_secret' with your credentials)
cloudinary.config({
  cloud_name: 'ddi6pgru6',
  api_key: '591212516396522',
  api_secret: 'VeO4H_xiEaUKw-xL6LpX3TPYOD4',
  folder: 'Distant' 
});


app.use('/uploads',express.static(__dirname+'/uploads'))

require('./config/database').connect();

const bcryptSalt = bcrypt.genSaltSync(10);
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:'http://127.0.0.1:3000', //dekh ke
  })
);

app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'testing success',
  });
});


function getUserDataFromReq(req){

  return  new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, {}, async(err, user) => {
      if(err)throw err;
      resolve(user);
  
    });
  });
  
}


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name:userDoc.name
        },
        process.env.JWT_SECRET_KEY,
        {},
        (err, token) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.cookie('token', token);
          res.status(200).json(userDoc);
        }
      );
    } else {
      res.status(404).json({
        success: false,
        message: 'Invalid password',
      });
    }
  }
  else{
    res.status(404).json({sucess: true,message: 'Invalid User'});
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  try {
    res.cookie('token','').json(true);
  } catch (error) {
    res.status(500).json({
      success:false,
      message: 'not able to logout',
    });

    
  }
})

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ success: false, message: 'The link is required' });
  }

  try {
    const newName = 'photo_' + Date.now();
    const result = await cloudinary.uploader.upload(link, { folder: 'Distant',public_id: newName  });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload the image to Cloudinary' });
  }
});


// const photosMiddleware= multer({dest:'uploads'});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.array('photos', 100), async (req, res) => {
  const uploadedFiles = [];

  try {
    const promises = req.files.map(async (file) => {
      const newName = 'photo_' + Date.now(); // Generate a new name (you can adjust this naming convention)
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'Distant',
        public_id: newName // Set the desired name for the uploaded file
      });

      uploadedFiles.push(result.secure_url); // Store Cloudinary URL in the array
    });

    await Promise.all(promises);

    res.json(uploadedFiles);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload files to Cloudinary' });
  }
});



app.post('/places',(req,res) => {
  const {token}=req.cookies;
  const {title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuest,price}=req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const PlaceDoc=await Place.create({
      owner:userData.id,
      title,address,photos:addedPhotos
      ,description,perks,extraInfo,
      checkIn,checkOut,maxGuest,price,
    });
    res.json(PlaceDoc);
  });
});

app.get('/user-places', async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(500);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
    if (err) throw err;
    const { id } = user;
    const places = await Place.find({ owner: id });
    res.json(places);
  });
});

app.get('/places/:id',async (req, res) => {
  const {id}=req.params;
  res.json(await Place.findById(id));
})

app.put('/places/',async (req, res) =>{
  const {token}=req.cookies;
  const {title,address,addedPhotos,
   id, description,perks,extraInfo,
    checkIn,checkOut,maxGuest,price}=req.body;

    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
      const placeDoc=await Place.findById(id);
     if(user.id ===placeDoc.owner.toString()) {
      placeDoc.set({
        title,address,photos:addedPhotos
        ,description,perks,extraInfo,
        checkIn,checkOut,maxGuest,price,
      });
     await placeDoc.save();
      res.json('ok');
     }
    });

});
app.get('/places',async(req, res) => {
 res.json(await Place.find());
});

app.post('/booking', async(req,res) => {
  const userData = await getUserDataFromReq(req);
  try{
    const {checkIn,checkOut,noOfGuest,place,name,phone,price}=req.body;
    const data=await Booking.create({checkIn,checkOut,name,phone,price,noOfGuest,place,user:userData.id});
    res.status(200).json(data);
  }
catch(err) {
console.log(err);
res.status(500).json({success:false,message:`Book not created successfully `});
}

});
//booking are always private so we need to validate
app.get('/bookings',async(req, res) => {
const userData=await getUserDataFromReq(req)

res.json(await Booking.find({user:userData.id}).populate('place'));
});




app.listen(4000, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log('Server listening on port 4000');
  }
});
