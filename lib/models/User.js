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

  static async insert({
    firstName,
    lastName,
    email,
    userName,
    pin
  }) {
    const { rows } = await pool.query(
      `INSERT INTO
        users (first_name, last_name, email, user_name, pin)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *`,
      [firstName, lastName, email, userName, pin]
    );
    return new User(rows[ 0 ]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM users',
      []
    );
    return rows.map((row) => new User(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT *
        FROM users
        WHERE id=$1`,
      [id]
    );
    return new User(rows[ 0 ]);
  }

  static async updateById(id) {

  }

  static async patchById(id) {

  }

  static async deleteById(id) {

  }
}
