var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    lowercase: true,
    required: [true, 'can\'t be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  last_name: {
    type: String,
    lowercase: true,
    required: [true, 'can\'t be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  }
}, { timestamps: true });

mongoose.model('Employee', EmployeeSchema);
