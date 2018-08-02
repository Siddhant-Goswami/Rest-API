const express = require('express');
const router = express.Router();

const Order = require('../models/order');
const ordersController = require('../controllers/orders');

router.get('/', ordersController.orders_all);

router.post('/', ordersController.orders_post);

router.get('/:oid', ordersController.orders_getId);

router.delete('/:oid', ordersController.orders_delete);
// router.patch('/:p', (req, res, next)=>{
//     res.status(200).json({
//         message: 'patch orders'
//     })
// });
module.exports=router;
