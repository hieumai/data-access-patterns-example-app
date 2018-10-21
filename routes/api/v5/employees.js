import express from 'express';
import EmployeeMapper from '../../../data_access_layers/DataMapper/EmployeeMapper';
import Employee from '../../../data_access_layers/DataMapper/Employee';

const router = express.Router();

/**
 * Get employee by id
 */
router.get('/employees/:id', (req, res, next) => {
  EmployeeMapper.findById(req.params.id)
    .then(employee => !employee.id ? res.sendStatus(404) : res.json(employee.convertToJson()))
    .catch(next);
});

/**
 * Find employees by criteria
 */
router.get('/employees', (req, res, next) => {
  EmployeeMapper.find(req.query.firstName, req.query.lastName)
    .then(employees => !employees ? res.sendStatus(404) : res.json(employees.map(employee => employee.convertToJson())))
    .catch(next);
});

/**
 * Update employee
 */
router.put('/employees/:id', (req, res, next) => {
  const employee = new Employee({ id: req.params.id, firstName: req.body.firstName, lastName: req.body.lastName })
  EmployeeMapper.update(employee)
    .then(employee => !employee.id ? res.sendStatus(404) : res.json(employee.convertToJson()))
    .catch(next);
});

/**
 * Create employee
 */
router.post('/employees', (req, res, next) => {
  const employee = new Employee(req.body);
  EmployeeMapper.create(employee)
    .then(employee => res.json(employee.convertToJson()))
    .catch(next);
});

/**
 * Delete employee by id
 */
router.delete('/employees/:id', (req, res, next) => {
  const employee = new Employee({ id: req.params.id });
  EmployeeMapper.delete(employee)
    .then(() => res.sendStatus(204))
    .catch(next);
});

/**
 * Check if the input employee is "dangerous" or not
 * An employee is dangerous if his/her first name is "fake"
 */
router.get('/employees/:id/isDangerous', (req, res, next) => {
  EmployeeMapper.findById(req.params.id)
    .then(employee => !employee.id ? res.sendStatus(404) : res.json(employee.isDangerous()))
    .catch(next);
});

module.exports = router;
