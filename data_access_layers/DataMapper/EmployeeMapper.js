import mongoose from 'mongoose';
import Employee from './Employee'

const EmployeeModel = mongoose.model('Employee');
const ObjectId = mongoose.Types.ObjectId;

export default class EmployeeMapper {
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

  static findById(id) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    return EmployeeModel.findById(id)
      .then(employeeDB => new Employee(EmployeeMapper.mapToCamelCase(employeeDB)));
  }

  static find(firstName, lastName) {
    const query = {};
    if (firstName) {
      query.first_name = firstName;
    }
    if (lastName) {
      query.last_name = lastName;
    }

    return EmployeeModel.find(query)
      .then(employees => employees.map(employeeDB => new Employee(EmployeeMapper.mapToCamelCase(employeeDB))));
  }

  static create(employee) {
    return EmployeeModel.create({ first_name: employee.firstName, last_name: employee.lastName })
      .then(employeeDB => new Employee(EmployeeMapper.mapToCamelCase(employeeDB)));
  }

  static update(employee) {
    if (!ObjectId.isValid(employee.id)) {
      return Promise.resolve(null);
    }
    return EmployeeModel.findByIdAndUpdate(employee.id, EmployeeMapper.mapToSnakeCase(employee), { new: true })
      .then(employeeDB => new Employee(EmployeeMapper.mapToCamelCase(employeeDB)));
  }

  static delete(employee) {
    if (!ObjectId.isValid(employee.id)) {
      return Promise.resolve(null);
    }
    return EmployeeModel.findByIdAndRemove(employee.id);
  }
}