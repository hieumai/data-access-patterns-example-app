export default class Employee {
  constructor({ id, firstName, lastName }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  convertToJson() {
    return { id: this.id, firstName: this.firstName, lastName: this.lastName };
  }

  isDangerous() {
    return this.firstName === 'fake'
  }
}