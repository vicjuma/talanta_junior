const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Player = require('../../models/users/players');
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
    cb(null, './uploads/players');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
  }
});

const upload = multer({storage, limits: {
  fileSize: 1024 * 1024 * 5
}, fileFilter});

router.post('/signup', upload.single('profilePicture'), (req, res, next) => {
  Player.find({playerADM: req.body.playerADM})
    .exec()
      .then((player) => {
        if(player.length >= 1){
          return res.status(409).json('Player already exists')
        }else{
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return new Error('there was a problem hashing the password');
            }else{
              const player = new Player({
                _id: new mongoose.Types.ObjectId,
                playerFirstName: req.body.playerFirstName,
                playerLastName: req.body.playerLastName,
                parentFirstName: req.body.parentFirstName,
                parentLastName: req.body.parentLastName,
                parentPhone: req.body.parentPhone,
                playerHeight: req.body.playerHeight,
                playerWeight: req.body.playerWeight,
                playerAge: req.body.playerAge,
                playerHealthStatus: req.body.playerHealthStatus,
                playerSchool: req.body.playerSchool,
                playerResidence: req.body.playerResidence,
                playerADM: req.body.playerADM,
                profilePicture: req.file.path,
                password: hash,
              });
              player.save()
            .then((result) => {
              res.status(201).json({
                message: "Player created successfully",
                player: result
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
  Player.find({email: req.body.email})
    .exec()
      .then((player) => {
        if(!player){
          return res.status(404).send('unauthorized access');
        }
        bcrypt.compare(req.body.password, user[0].password, (err, valid) => {
          if(err){
            return res.status(404).json({message: 'unauthorized access'});
          }
          if(valid){
            token = jwt.sign({
              playerADM: player[0].playerADM,
              id: player[0]._id
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
  Player.find({id:id})
      .exec()
        .then((result) => {
          res.status(200).send(result);
        }).catch((err) => {
          res.status(500).json({err});
        });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Player.remove({_id: id})
    .exec()
      .then((result) => res.send(result))
        .catch(err => res.send(err));
});

module.exports = router;