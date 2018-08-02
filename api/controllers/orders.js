const Order = require('../models/order');
const mongoose = require('mongoose');

exports.orders_all = (req, res, next)=>{
   Order.find()
   .populate('product','name')
   .exec()
   .then(docs => {
       const response ={
         count: docs.length,
         orders: docs.map(doc => {
           return{
             order_id: doc._id,
             quantity: doc.quantity,
             product_id: doc.product._id,
             product_name: doc.product.name,
             request: {
               type: 'GET',
               url: 'http://localhost:3000/orders/'+doc._id
             }
           }
         })
       }
         if (docs.length >= 0) {
       res.status(200).json(response);
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

exports.orders_post = (req, res, next)=>{
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
    });
    order
    .save()
    .then(result =>{
      res.status(201).json({
          message: "Order placed Successfuly!",
            request: {
              type: 'GET',
              url: 'http://localhost:3000/orders/'+ result._id
            }
      });
    })
    .catch(err =>{
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_getId = (req, res, next)=>{
  const id = req.params.oid;
  Order.findById(id)
      .populate('product','name')
      .exec()
      .then(doc => {
          console.log("From database", doc);
          if (doc) {
              res.status(200).json({
                order_id: doc._id,
                quantity: doc.quantity,
                product_id: doc.product._id,
                product_name: doc.product.name,
                request: {
                  type: 'GET',
                  description: 'Get all the orders',
                  url: 'http://localhost:3000/orders'
                }
              });
          } else {
              res
                  .status(404)
                  .json({ message: "No valid entry found for provided ID" });
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
      });
};

exports.orders_delete = (req, res, next)=>{
  const id = req.params.oid;
  Order.findOneAndRemove({ _id: id })
      .exec()
      .then(result => {
          res.status(200).json({
         message: "Order deleted Successfuly",
         request: {
           type:'GET',
           description: 'Get all the orders',
           url: 'http://localhost:3000/orders'
         }
       });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          })
      });
};
