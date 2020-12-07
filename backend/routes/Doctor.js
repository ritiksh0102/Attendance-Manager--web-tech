const router = require('express').Router();
let Doctor = require('../models/Doctor.model');

router.route('/').get((req, res) => {   //get all doctors information as json format
  Doctor.find()
    .then(Doctors => res.json(Doctors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => { //expections for adding 
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const onduty = req.body.onduty;
  const patient_treated =req.body.patient_treated;
  const offduty= req.body.offduty;

  const newDoctor = new Doctor({
    username,
    description,
    date,
    onduty,
    patient_treated,
    offduty
  });

  newDoctor.save()
  .then(() => res.json('Doctor added!'))    //promise
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Doctor.findById(req.params.id)
    .then(Doctor => res.json(Doctor))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {      //any update that u want in 
  Doctor.findById(req.params.id)
    .then(Doctor => {
      Doctor.username = req.body.username;
      Doctor.description = req.body.description;
      Doctor.date = Date.parse(req.body.date);
      Doctor.onduty=req.body.onduty;
      Doctor.patient_treated=req.body.patient_treated;
      Doctor.offduty=req.body.offduty;


      Doctor.save()
        .then(() => res.json('Doctor updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
