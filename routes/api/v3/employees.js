import express from 'express';

const router = express.Router();
import EmployeeGateway from '../../../data_access_layers/RowDataGateway/EmployeeGateway';
import EmployeeFinder from '../../../data_access_layers/RowDataGateway/EmployeeFinder';

/**
 * Get employee by id
 */
router.get('/employees/:id', (req, res, next) => {
  EmployeeFinder.findById(req.params.id)
    .then(employee => !employee ? res.sendStatus(404) : res.json(employee.convertToJson()))
    .catch(next);
});

/**
 * Find employees by criteria
 */
router.get('/employees', (req, res, next) => {
  EmployeeFinder.find(req.query.firstName, req.query.lastName)
    .then(employees => !employees ? res.sendStatus(404) : res.json(employees.map(employee => employee.convertToJson())))
    .catch(next);
});

/**
 * Update employee
 */
router.put('/employees/:id', (req, res, next) => {
  EmployeeFinder.findById(req.params.id)
    .then(employee => employee && employee.setFirstName(req.body.firstName).setLastName(req.body.lastName).update())
    .then(employee => !employee ? res.sendStatus(404) : res.json(employee.convertToJson()))
    .catch(next);
});

/**
 * Create employee
 */
router.post('/employees', (req, res, next) => {
  const employeeGateway = new EmployeeGateway(req.body);

  employeeGateway.create()
    .then(employee => res.json(employee.convertToJson()))
    .catch(next);
});

/**
 * Delete employee by id
 */
router.delete('/employees/:id', (req, res, next) => {
  EmployeeFinder.findById(req.params.id)
    .then(employee => employee.delete())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
