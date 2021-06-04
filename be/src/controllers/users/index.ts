import { ERROR_CODES } from '../../config/constants';
import { Handler } from '../../models/route';
import { ControllerResponse } from '../../models/service';
import * as UserService from '../../services/userService';

export const postUserLogin: Handler = async (req, res) => {
  const uid = req.body?.uid;
  if (!!uid) {
    const result = await UserService.userLogin(uid);
    if (!result.error) {
      const response: ControllerResponse = {
        data: {
          uid,
          result,
        },
      };
      res.send(response);
    } else {
      const response: ControllerResponse = {
        error: {
          code: result.error.code,
          message: `Could not save the information: ${result.error.message}`,
        },
      };
      res.status(400).send(response);
    }
  } else {
    const response: ControllerResponse = {
      error: {
        code: ERROR_CODES.INVALID_INPUTS,
        message: '"uid" parameter required.',
      },
    };
    res.status(400).send(response);
  }
};
