import mongoose from 'mongoose';

const Employee = mongoose.model('Employee');
const ObjectId = mongoose.Types.ObjectId;

export default class EmployeeGateway {
  static findById(id) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    return Employee.findById(id).then(employee => EmployeeGateway.mapToCamelCase(employee));
  }

  static mapToCamelCase(employee) {
    if (!employee) {
      return Promise.resolve(null);
    }
    return { firstName: employee.first_name, lastName: employee.last_name, id: employee.id };
  }

  static mapToSnakeCase(employee) {
    if (!employee) {
      return Promise.resolve(null);
    }
    return { first_name: employee.firstName, last_name: employee.lastName, id: employee.id };
  }

  static find(firstName, lastName) {
    const query = {};
    if (firstName) {
      query.first_name = firstName;
    }
    if (lastName) {
      query.last_name = lastName;
    }

    return Employee.find(query).then(employees => employees.map(employee => EmployeeGateway.mapToCamelCase(employee)));
  }

  static create(firstName, lastName) {
    return Employee.create({ first_name: firstName, last_name: lastName })
      .then(employee => EmployeeGateway.mapToCamelCase(employee));
  }

  static update(id, firstName, lastName) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    return Employee.findByIdAndUpdate(id, EmployeeGateway.mapToSnakeCase({
      firstName,
      lastName
    }), { new: true }).then(employee => EmployeeGateway.mapToCamelCase(employee));
  }

  static delete(id) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    return Employee.findByIdAndRemove(id);
  }
}