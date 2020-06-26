const express = require('express');
const router = express.Router();

/* GET users listing. */
const User = require('../models/User');

router.post('/new', function(req, res) {
   const user = new User({
    fullName: 'John',
    age: 30,
   });
   user.save((err, data) => {
     if(err)
     console.log(err);

     res.json(data)
   });
});

module.exports = router;
