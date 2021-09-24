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

  static async updateById(id, {
    firstName,
    lastName,
    email,
    userName,
    pin }) {
    const existingUser = await User.getById(id);
    const updatedUser = {
      firstName: firstName ?? existingUser.firstName,
      lastName: lastName ?? existingUser.lastName,
      email: email ?? existingUser.email,
      userName: userName ?? existingUser.userName,
      pin: pin ?? existingUser.pin,
    }
    const { rows } = await pool.query(
      `UPDATE users
        SET first_name=$1,
            last_name=$2,
            email=$3,
            user_name=$4,
            pin=$5
          RETURNING *`,
      [{ updatedUser }]
    );
    return new User(rows[ 0 ]);
    }
    
  static async patchById(id, {
    firstName,
    lastName,
    email,
    userName,
    pin
  }) {
    const exixtingUser = await User.getById(id);
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

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE *
        FROM users
        WHERE id=$1
        RETURNING *`,
      [id]
    );
    return new User(rows[0]);
  }
}
