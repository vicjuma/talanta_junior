const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Coach = require('../../models/users/coaches');
const multer = require('multer');

const router = express.Router();

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/coaches');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
  }
});

const upload = multer({storage, limits: {
  fileSize: 1024 * 1024 * 5
}, fileFilter});

router.post('/signup', upload.single('profilePicture'), (req, res, next) => {
  Coach.find({email: req.body.email})
    .exec()
      .then((coach) => {
        if(coach.length >= 1){
          return res.status(409).json('Coach already exists')
        }else{
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return new Error('there was a problem hashing the password');
            }else{
              const coach = new Coach({
                _id: new mongoose.Types.ObjectId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                profilePicture: req.file.path,
                password: hash,
              });
              coach.save()
            .then((result) => {
              res.status(201).json({
                message: "Coach created successfully",
                coach: result
              });
            }).catch((err) => {
              res.status(401).json({err});
            });
            }
          });
        }
      }).catch(err => res.status(500).json({err}));
  // creating a new user
});

router.post('/login', (req, res, next) => {
  Coach.find({email: req.body.email})
    .exec()
      .then((coach) => {
        if(!coach){
          return res.status(404).send('unauthorized access');
        }
        bcrypt.compare(req.body.password, coach[0].password, (err, valid) => {
          if(err){
            return res.status(404).json({message: 'unauthorized access'});
          }
          if(valid){
            token = jwt.sign({
              email: coach[0].email,
              id: coach[0]._id
            }, 'mynameisvictorjuma', {
              expiresIn: '1h'
            });
            return res.status(200).json({
              message: 'authorized access',
              token: token
            });
          }
        });
      })
        .catch(err => res.json({err}));
        // next();
});

router.get('/', (req,res,next) => {
  const id = req.body._id
  Coach.find({id:id})
      .exec()
        .then((result) => {
          res.status(200).send(result);
        }).catch((err) => {
          res.status(500).json({err});
        });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Coach.remove({_id: id})
    .exec()
      .then((result) => res.send(result))
        .catch(err => res.send(err));
});

module.exports = router;