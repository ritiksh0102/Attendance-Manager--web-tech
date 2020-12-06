const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  onduty: {type: Number,required:true},
  patient_treated:{type: Number,required:true},
  offduty:{ type:Number,required:true},
  
}, {
  timestamps: true,
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor; 