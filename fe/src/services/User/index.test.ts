import { doesNotThrow } from "assert";
import UserService from ".";
import { newSecureUser, User } from "../../models/user";

const mockResponse = {} as Response;

beforeEach(() => {
  jest.mock('../../repos/http', () => (Promise.resolve(mockResponse)));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('UserService', () => {
  it('can login the User', async () => {
    const userService = new UserService();
    const user = newSecureUser().user;
    user.referenceId = '123456';
    doesNotThrow(async () => {
      await userService.userLogin(user);
    });
  });

  it('doesn\'t fail for undefined user or refernceId', async () => {
    const userService = new UserService();
    const user = newSecureUser().user;
    user.referenceId = undefined;
    doesNotThrow(async () => {
      await userService.userLogin(undefined as unknown as User);
    });
    doesNotThrow(async () => {
      await userService.userLogin(user);
    });
  });

  it('can create a user', async () => {
    const userService = new UserService();
    doesNotThrow(async () => {
      await userService.createUser({});
    });
  })
});
