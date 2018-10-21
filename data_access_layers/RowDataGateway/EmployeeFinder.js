import mongoose from 'mongoose';
import EmployeeGateway from './EmployeeGateway';

const Employee = mongoose.model('Employee');
const ObjectId = mongoose.Types.ObjectId;

export default class EmployeeFinder {
  static findById(id) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    return Employee.findById(id)
      .then(employee => EmployeeGateway.createFromDatabaseObject(employee));
  }

  static find(firstName, lastName) {
    const query = {};
    if (firstName) {
      query.first_name = firstName;
    }
    if (lastName) {
      query.last_name = lastName;
    }

    return Employee.find(query)
      .then(employees => employees.map(employee => EmployeeGateway.createFromDatabaseObject((employee))));
  }
}