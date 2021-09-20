import pool from '../utils/pool';

export default class User {
  id;
  firstName;
  lastName;
  email;
  userName;
  pin;

  constructor(row) {
    this.id = row.id,
      this.firstName = row.firstName,
      this.lastName = row.lastName,
      this.email = row.email,
      this.userName = row.userName,
      this.pin = row.pin
  }

  static async insert({}) {

  }

  static async getAll() {

  }

  static async getById(id) {

  }

  static async updateById(id) {

  }

  static async patchById(id) {

  }

  static async deleteById(id) {
    
  }
}
