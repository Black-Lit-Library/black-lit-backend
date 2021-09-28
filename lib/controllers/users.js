import { Router } from 'express';
import UserService from '../services/UserService.js';
import User from '../models/User.js';

export const controllerRouter = Router()

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

  .get('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const user = await User.getByUserName(username);

      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .put('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const {
        firstName,
        lastName,
        email,
        userName,
        pin } = req.body;

      const updatedUser = await User.updateByUserName(
        username,
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

  .patch('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const {
        firstName,
        lastName,
        email,
        userName,
        pin } = req.body;

      const updatedUser = await User.updateByUserName(
        username,
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
  
  .delete('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const user = await UserService.delete(username);
      
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

