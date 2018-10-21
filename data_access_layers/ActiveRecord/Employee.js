import mongoose from 'mongoose';

const EmployeeModel = mongoose.model('Employee');
const ObjectId = mongoose.Types.ObjectId;

export default class Employee {
  constructor({ id, firstName, lastName }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static createFromDatabaseObject(employeeDB) {
    if (!employeeDB) {
      return null;
    }
    const employee = new Employee({});
    return employee.updateValueFromDatabase(employeeDB);
  }

  static findById(id) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve(null);
    }
    return EmployeeModel.findById(id)
      .then(employee => Employee.createFromDatabaseObject(employee));
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
      .then(employees => employees.map(employee => Employee.createFromDatabaseObject((employee))));
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
    return EmployeeModel.create({ first_name: this.firstName, last_name: this.lastName })
      .then(employee => this.updateValueFromDatabase(employee));
  }

  update() {
    if (!this.id) {
      return Promise.reject('Not found');
    }
    return EmployeeModel.findByIdAndUpdate(this.id, this.mapToSnakeCase(), { new: true })
      .then(employee => this.updateValueFromDatabase(employee));
  }

  delete() {
    if (!this.id) {
      return Promise.reject('Not found');
    }
    return EmployeeModel.findByIdAndRemove(this.id);
  }

  convertToJson() {
    return { id: this.id, firstName: this.firstName, lastName: this.lastName };
  }

  isDangerous() {
    return this.firstName === 'fake'
  }
}