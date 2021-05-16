import { UserService } from '.';
import { User } from '..';

const mockUser: User = {
  username: 'Mock',
  firstname: 'John',
  lastname: 'Smith',
};

const mockResponse = {
  json: () => Promise.resolve([mockUser]),
} as Response;

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockResponse))
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('User Service', () => {
  it('gets the user from API', async () => {
    const users = await UserService().getUsers();
    expect(users).toBeDefined();
    expect(users).toEqual([mockUser]);
  });
});
