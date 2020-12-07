const router = require('express').Router();//routes we r creating
let user = require('../models/user.model');//loading model

router.route('/').get((req, res) => {         //first in point that handles http request
  user.find()
    .then(users => res.json(users))//return in json format
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {   //to add new user
  const username = req.body.username;

  const newUser = new user({username});   //new instance of user

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
