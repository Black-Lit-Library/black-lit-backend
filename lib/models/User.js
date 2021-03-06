import pool from '../utils/pool.js';

export default class User {
  id;
  firstName;
  lastName;
  email;
  userName;
  pin;

  constructor(row) {
    this.id = row.id,
      this.firstName = row.first_name,
      this.lastName = row.last_name,
      this.email = row.email,
      this.userName = row.user_name,
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
      `INSERT INTO users (first_name, last_name, email, user_name, pin)
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

  static async getByUserName(username) {
    const { rows } = await pool.query(
      `SELECT *
        FROM users
        WHERE user_name = $1`,
      [username]
    );
    return new User(rows[ 0 ]);
  }

  static async updateByUserName(username, {
    firstName,
    lastName,
    email,
    userName,
    pin }) {
    const existingUser = await User.getByUserName(username);
    const newFirstName = firstName ?? existingUser.firstName;
    const newLastName = lastName ?? existingUser.lastName;
    const newEmail = email ?? existingUser.email;
    const newUserName = userName ?? existingUser.userName;
    const newPin = pin ?? existingUser.pin;
    
    const { rows } = await pool.query(
      `UPDATE users
        SET first_name=$1,
            last_name=$2,
            email=$3,
            user_name=$4,
            pin=$5
          RETURNING *`,
      [newFirstName, newLastName, newEmail, newUserName, newPin]
    );
    return new User(rows[ 0 ]);
    }
    
  static async patchByUserName(username, {
    firstName,
    lastName,
    email,
    userName,
    pin
  }) {
    const exixtingUser = await User.getByUserName(username);
    const newFirstName = firstName ?? existingUser.firstName;
    const newLastName = lastName ?? existingUser.lastName;
    const newEmail = email ?? exixtingUser.email;
    const newUserName = userName ?? exixtingUser.userName;
    const newPin = pin ?? exixtingUser.pin;
    const { rows } = await pool.query(
      `UPDATE users
        SET first_name=$1,
            last_name=$2,
            email=$3,
            user_name=$4,
            pin=$5
          RETURNING *`,
      [
        newFirstName,
        newLastName,
        newEmail,
        newUserName,
        newPin
      ]
    );
    return new User(rows[ 0 ]);
  }

  static async deleteByUserName(username) {
    const { rows } = await pool.query(
      `DELETE FROM users
        WHERE user_name=$1
        RETURNING *`,
      [username]
    );
    return new User(rows[0]);
  }
}
