const mongoose = require("mongoose");
const User = require("../models/user");

exports.get_all = (req,res)=>{
  User.find()
  .exec()
  .then(docs => {
        if (docs.length >= 0) {
      res.status(200).send(docs);
        } else {
            res.status(404).json({
                message: 'No entries found'
            });
        }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
};

exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user =>{
      if(user.length >=1){

        return res.status(409).json({
          message: 'E-mail already exist!'
        });

      }
      else{

        bcrypt.hash(req.body.password, 10, (err, hash)=>{
          if(err){
            return res.status(500).json({
              error: err
            });
          }
          else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(result =>{
              res.status(201).json({
                message: 'User created Successfuly!'
              });
            })
            .catch(err =>{
              res.status(500).json({
                error: err
              });
            });
          }
        });
      }
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
  .exec()
  .then(user =>{
    if(user.length <1){
      return res.status(401).json({
        message: 'Authentication Failed!'
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err){
        return res.status(401).json({
          message: 'Authentication Failed!'
        });
      }
      if(result){
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, 'API_SECRET_KEY',{
          expiresIn: "1h"
        });
        return res.status(200).json({
          message: 'Authentication Successfull!',
          token: token
        });
      }
      return res.status(401).json({
        message: 'Authentication Failed!'
      });
    });
})
.catch(err =>{
  res.status(500).json({
    error: err
  });
});
};
