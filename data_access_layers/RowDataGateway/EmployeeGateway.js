import mongoose from 'mongoose';

const Employee = mongoose.model('Employee');

export default class EmployeeGateway {
  constructor({ id, firstName, lastName }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static createFromDatabaseObject(employee) {
    const employeeGateway = new EmployeeGateway({});
    return employeeGateway.updateValueFromDatabase(employee);
  }

  setFirstName(firstName) {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  updateValueFromDatabase(employee) {
    if (!employee) {
      return this;
    }
    this.id = employee.id;
    this.firstName = employee.first_name;
    this.lastName = employee.last_name;
    return this;
  }

  mapToSnakeCase() {
    return { first_name: this.firstName, last_name: this.lastName, id: this.id };
  }

  create() {
    return Employee.create({ first_name: this.firstName, last_name: this.lastName })
      .then(employee => this.updateValueFromDatabase(employee));
  }

  update() {
    if (!this.id) {
      return Promise.reject('Not found');
    }
    return Employee.findByIdAndUpdate(this.id, this.mapToSnakeCase(), { new: true })
      .then(employee => this.updateValueFromDatabase(employee));
  }

  delete() {
    if (!this.id) {
      return Promise.reject('Not found');
    }
    return Employee.findByIdAndRemove(this.id);
  }

  convertToJson() {
    return { id: this.id, firstName: this.firstName, lastName: this.lastName };
  }
}