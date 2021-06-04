import { API_ERROR_CODES } from '../config/constants';
import { ServiceResponse } from '../models/service';
import * as UserRepo from '../repos/users';

export const userLogin = async (uid: string): Promise<ServiceResponse> => {
  const result = await UserRepo.storeUserLogin(uid);
  if (result) {
    return {
      data: result,
    };
  } else {
    return {
      data: result,
      error: {
        code: API_ERROR_CODES.CANNOT_INSERT_DATA,
        message: 'Cannot insert UID.',
      },
    };
  }
};
