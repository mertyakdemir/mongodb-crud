const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/Product');

router.post('/new', function(req, res, next) {
   const product = new Product({
     title: 'Iphone',
     isOnline: true,
     comments: [
         { message: "Good" },
     ],
     att: {
         vote: 12,
     }
   });
   product.save((err, data) => {
     if(err)
     console.log(err);

     res.json(data)
   });
});

router.get('/search', (req, res) => {
  Product.find( { isOnline: true}, (err, data) => {
    res.json(data);
  });
});

router.get('/searchbyID', (req, res) => {
  Product.findById('5ef462a347c6a62b88ee40a8', (err, data) => {
    res.json(data);
  });
});

router.put('/update', (req, res) => {
  Product.update({ isOnline: true}, {isOnline: false}, {multi: true}, (err, data) => {
    res.json(data);
  });
});

router.put('/updatebyID', (req, res) => {
  Product.findByIdAndUpdate('5ef462a347c6a62b88ee40a8',
   {
      title: 'Samsung'
   },
      (err, data) => {
    res.json(data);
  });
});

router.delete('/delete', (req, res) => {
  Product.remove( { isOnline: false}, (err, data) => {
    res.json(data);
  });
})

router.get('/sort', (req, res) => {
  Product.find( {}, (err, data) => {
    res.json(data);
  }).sort({ 'title': 1 });
});

router.get('/aggregate', (req, res) => {
  Product.aggregate([
      {
          $match: {
              isOnline: true
          }
      },
      {
          $project: {
              title: 1,
          }
      },

  ], (err, result) => {
      res.json(result);
  });
});

/*

router.get('/aggregate-lookup', (req, res) => {
  Product.aggregate([
      {
        $match: {
            _id: mongoose.Types.ObjectId('5ef47ef81c7e021db80a4fc0')
        }
      },
      {
          $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user'
          }
      },
      {
          $unwind: '$user'
      },
      {
          $project: {
              title: 1,
              user: '$user'
          }
      }
  ], (err, result) => {
      res.json(result);
  });
});

*/

module.exports = router;
