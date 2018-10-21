var mongoose = require('mongoose');
var router = require('express').Router();
var Employee = mongoose.model('Employee');
var ObjectId = mongoose.Types.ObjectId;

/**
 * Get employee by id
 */
router.get('/employees/:id', function (req, res, next) {
  // Check if input id is valid for mongodb
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }
  Employee.findById(id).then(function (employee) {
    if (!employee) {
      return res.sendStatus(404);
    }
    // convert found data to camel case and return
    return res.json({ firstName: employee.first_name, lastName: employee.last_name, id: employee.id });
  }).catch(next);
});

/**
 * Find employees by criteria
 */
router.get('/employees', function (req, res, next) {
  var query = {};
  // only query fields that were actually passed...
  // convert input data to snake case first
  if (typeof req.query.firstName !== 'undefined') {
    query.first_name = req.query.firstName;
  }
  if (typeof req.query.lastName !== 'undefined') {
    query.last_name = req.query.lastName;
  }

  Employee.find(query).then(function (employees) {
    if (!employees) {
      return res.sendStatus(404);
    }
    // convert found data to camel case and return
    return res.json(employees.map(employee => {
      return { firstName: employee.first_name, lastName: employee.last_name, id: employee.id };
    }));
  }).catch(next);
});

/**
 * Update employee
 */
router.put('/employees/:id', function (req, res, next) {
  // Check if input id is valid for mongodb
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }
  var employee = {};
  // only update fields that were actually passed...
  // convert input data to snake case first
  if (typeof req.body.firstName !== 'undefined') {
    employee.first_name = req.body.firstName;
  }
  if (typeof req.body.lastName !== 'undefined') {
    employee.last_name = req.body.lastName;
  }
  Employee.findByIdAndUpdate(id, employee, { new: true })
  .then(function (employee) {
    if (!employee) {
      return res.sendStatus(404);
    }
    return res.json({ firstName: employee.first_name, lastName: employee.last_name, id: employee.id });
  }).catch(next);
});

/**
 * Create employee
 */
router.post('/employees', function (req, res, next) {
  Employee.create({ first_name: req.body.firstName, last_name: req.body.lastName}).then(function (employee) {
    // convert found data to camel case and return
    return res.json({ firstName: employee.first_name, lastName: employee.last_name, id: employee.id });
  }).catch(next);
});

/**
 * Delete employee by id
 */
router.delete('/employees/:id', function (req, res, next) {
  // Check if input id is valid for mongodb
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }
  Employee.findByIdAndRemove(id).then(function () {
    return res.sendStatus(204);
  }).catch(next);
});

module.exports = router;
