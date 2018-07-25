const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next)=>{
   Order.find()
   .populate('product','name')
   .exec()
   .then(docs =>{
     res.status(200).json(docs);
   })
   .catch(err =>{
     res.status(500).json({
       error: err
     });
   });
});

router.post('/', (req, res, next)=>{
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
    });
    order
    .save()
    .then(result =>{
      res.status(201).json(result);
    })
    .catch(err =>{
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:oid', (req, res, next)=>{
    const id = req.params.oid;

        res.status(200).json({
            message: 'orders detail id',
            id: id
        });

});

// router.patch('/:p', (req, res, next)=>{
//     res.status(200).json({
//         message: 'patch orders'
//     })
// });

router.delete('/:p', (req, res, next)=>{
    res.status(200).json({
        message: 'delete orders'
    })
});
module.exports=router;
