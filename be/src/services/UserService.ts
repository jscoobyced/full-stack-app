import { ERROR_CODES } from '../config/constants';
import { ServiceResponse } from '../models/common';
import { User } from '../models/user';
import * as UserRepo from '../repos/user';

export const getUsers = async (): Promise<ServiceResponse> => {
  return UserRepo.getUsers().then((users) => {
    return {
      data: users,
    };
  });
};

export const addUser = async (user: User): Promise<ServiceResponse> => {
  if (!user.username?.trim() || !user.firstname?.trim() || !user.lastname?.trim()) {
    const response = {
      data: undefined,
      error: {
        code: ERROR_CODES.INVALID_INPUTS,
      },
    };
    return Promise.resolve(response);
  }

  return UserRepo.addUser(user).then((createdUser) => {
    return {
      data: createdUser,
    };
  });
};

export const getUserByUsername = async (username: string | undefined): Promise<ServiceResponse> => {
  const safeUsername = username ? (username as string) : '';
  return UserRepo.getUserByUsername(safeUsername).then((user) => {
    return {
      data: user,
    };
  });
};
