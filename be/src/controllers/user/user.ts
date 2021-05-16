import * as UserService from '../../services/UserService';
import { Handler } from '../../models/route';
import { User } from '../../models/user';
import { API_ERROR_CODES } from '../../config/constants';
import { ControllerResponse } from '../../models/common';

export const getUsers: Handler = async (req, res) => {
  const response: ControllerResponse = {};
  return UserService.getUsers().then((result) => {
    if (!!result.error) {
      response.error = {
        message: result.error.message,
      };
      res.status(400).send(response);
    } else if (!result.data || (result.data as User[]).length === 0) {
      response.error = {
        code: API_ERROR_CODES.NO_USER_FOUND,
      };
      res.status(404).send(response);
    } else res.send(result.data);
  });
};

export const addUser: Handler = async (req, res) => {
  const { username, firstname, lastname } = req.body;
  const newUser: User = { username, firstname, lastname };
  const response: ControllerResponse = {};
  return UserService.addUser(newUser).then((result) => {
    if (!!result.error) {
      response.error = {
        message: result.error.message,
      };
      res.status(400).send(response);
    } else if (!result.data) {
      response.error = {
        code: API_ERROR_CODES.USER_NOT_CREATED,
      };
      res.status(400).send(response);
    } else res.status(201).send(result.data);
  });
};

export const getUserByUsername: Handler = async (req, res) => {
  const { username } = req.query;
  return UserService.getUserByUsername(username?.toString()).then((result) => {
    if (!!result.error) {
      res.status(400).send(result.error.message);
    } else if (!result.data) {
      res.status(404).send('No user found');
    } else res.send(result.data);
  });
};
