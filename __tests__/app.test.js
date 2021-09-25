import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
// import { jest } from '@jest/globals';
import app from '../lib/app.js';
import User from '../lib/models/User';


describe('user account CRUD routes', () => {
  beforeEach(() => {
    // jest.setTimeout(10000);
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a user account via POST', async () => {
    const newUser = {
      firstName: 'Kheara',
      lastName: 'Rhodes',
      email: 'KRhodes23@email.com',
      userName: 'K_Rhodes23',
      pin: '1234'
    };

    const res = await request(app)
      .post('/api/v1/users')
      .send(newUser);
    
    expect(res.body).toEqual({
      id: '1',
      firstName: 'Kheara',
      lastName: 'Rhodes',
      email: 'KRhodes23@email.com',
      userName: 'K_Rhodes23',
      pin: '1234',
      mailPreview: expect.any(String)
    });
  });

  it('gets all users via GET', async () => {
    const user1 = await User.insert({
      id: '1',
      firstName: 'Kheara',
      lastName: 'Rhodes',
      email: 'KRhodes23@email.com',
      userName: 'K_Rhodes23',
      pin: '1234',
    });

    const user2 = await User.insert({
      id: '2',
      firstName: 'Tyshawn',
      lastName: 'Ford',
      email: 'TFord33@email.com',
      userName: 'T_Ford33',
      pin: '4321'
    });

    const user3 = await User.insert({
      id: '3',
      firstName: 'Sarani',
      lastName: 'Weinstein',
      email: 'SWeinstein@email.com',
      userName: 'S_Wein2019',
      pin:'5678'
    });
    
    return request(app)
      .get('/api/v1/users')
      .then((res) => {
        expect(res.body).toEqual([
          user1,
          user2,
          user3
        ]);
      });
  });

  it('get one user by id via GET', async () => {
    const user = await User.insert({
      id: '2',
      firstName: 'Tyshawn',
      lastName: 'Ford',
      email: 'TFord33@email.com',
      userName: 'T_Ford33',
      pin: '4321'
    });

    const res = await request(app)
      .get(`/api/v1/users/${user.id}`);
    
    expect(res.body).toEqual(user);
  });
  
  it('updates one user by id via PUT', async () => {
    const user = await User.insert({
      id: '2',
      firstName: 'Tyshawn',
      lastName: 'Ford',
      email: 'TFord33@email.com',
      userName: 'T_Ford33',
      pin: '4321'
    });

    const res = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .send({
        firstName: 'Ty',
      });

    expect(res.body).toEqual({
      ...user,
      firstName: 'Ty',
    });

  });
  it('updates one user by id via PATCH', async () => {
    const user = await User.insert({
      id: '2',
      firstName: 'Tyshawn',
      lastName: 'Ford',
      email: 'TFord33@email.com',
      userName: 'T_Ford33',
      pin: '4321'
    });

    const res = await request(app)
      .patch(`/api/v1/users/${user.id}`)
      .send({
        userName: 'Ty_33Ford',
      });

    expect(res.body).toEqual({
      ...user,
      userName: 'Ty_33Ford',
    });

  });
});
