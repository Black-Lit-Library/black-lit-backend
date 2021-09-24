import { Router } from 'express';
import UserService from '../services/UserService';
import User from '../models/User';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const users = await User.getAll();

      res.send(users);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.getById(id);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        email,
        userName,
        pin } = req.body;

      const updatedUser = await User.updateById(
        id,
        {
          firstName,
          lastName,
          email,
          userName,
          pin
        }
      );
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        email,
        userName,
        pin } = req.body;

      const updatedUser = await User.updateById(
        id,
        {
          firstName,
          lastName,
          email,
          userName,
          pin
        }
      );
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserService.delete(id);
      
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
