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


app.use('/uploads',express.static(__dirname+'/uploads'))

require('./config/database').connect();

const bcryptSalt = bcrypt.genSaltSync(10);
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:'http://127.0.0.1:3000',
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
    res.status(400).json({ success: false, message: 'The link is required' });
    return;
  }

  const newName = 'photo'+Date.now() + '.jpg';
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to download and save the image' });
  }
});


const photosMiddleware= multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res) => {
  const uplodedFiles=[];
for(let i=0;i<req.files.length;i++) {
  const {path,originalname}=req.files[i];
  const parts=originalname.split('.');
  const ext=parts[parts.length-1];
  const newPath=path +'.'+ext;
  fs.renameSync(path,newPath);
  uplodedFiles.push(newPath.replace('uploads/',''));
}

res.json(uplodedFiles);
})


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
