import { ServiceResponse } from '../../models/common';
import { User } from '../../models/user';

const user: User = {
  userId: 1,
  username: 'Mock',
  firstname: 'Mock',
  lastname: 'User',
};

export const getUsers = async (): Promise<ServiceResponse> => {
  return Promise.resolve({ data: [user] });
};

export const addUser = async (): Promise<ServiceResponse> => {
  return Promise.resolve({ data: user });
};

export const getUserByUsername = async (): Promise<ServiceResponse> => {
  return Promise.resolve({ data: user });
};
