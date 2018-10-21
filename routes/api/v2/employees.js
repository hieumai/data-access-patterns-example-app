import express from 'express';
import EmployeeGateway from '../../../data_access_layers/TableDataGateway/EmployeeGateway';

const router = express.Router();

/**
 * Get employee by id
 */
router.get('/employees/:id', (req, res, next) => {
  EmployeeGateway.findById(req.params.id)
    .then(employee => !employee ? res.sendStatus(404) : res.json(employee))
    .catch(next);
});

/**
 * Find employees by criteria
 */
router.get('/employees', (req, res, next) => {
  EmployeeGateway.find(req.query.firstName, req.query.lastName)
    .then(employees => !employees ? res.sendStatus(404) : res.json(employees))
    .catch(next);
});

/**
 * Update employee
 */
router.put('/employees/:id', (req, res, next) => {
  EmployeeGateway.update(req.params.id, req.body.firstName, req.body.lastName)
    .then(employee => !employee ? res.sendStatus(404) : res.json(employee))
    .catch(next);
});

/**
 * Create employee
 */
router.post('/employees', (req, res, next) => {
  EmployeeGateway.create(req.body.firstName, req.body.lastName)
    .then(employee => res.json(employee))
    .catch(next);
});

/**
 * Delete employee by id
 */
router.delete('/employees/:id', (req, res, next) => {
  EmployeeGateway.delete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
