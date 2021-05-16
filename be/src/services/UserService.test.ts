import { ERROR_CODES } from '../config/constants';
import { User, UserTypes } from '../models/user';
import { getUsers, addUser, getUserByUsername } from './UserService';
import * as UserRepo from '../repos/user';

let mockData = (): UserTypes => undefined;
const mockUser: User = {
  username: 'Mocked',
  firstname: 'Johnny',
  lastname: 'Smith',
};

const mockGetUsers = jest.spyOn(UserRepo, 'getUsers').mockImplementation(() => Promise.resolve(mockData() as User[]));
const mockAddUser = jest.spyOn(UserRepo, 'addUser').mockImplementation(() => Promise.resolve(mockData() as User));
const mockGetUserByUsername = jest
  .spyOn(UserRepo, 'getUserByUsername')
  .mockImplementation(() => Promise.resolve(mockData() as User));

afterEach(() => {
  mockData = (): UserTypes => undefined;
});

afterAll(() => {
  mockGetUsers.mockReset();
  mockAddUser.mockReset();
  mockGetUserByUsername.mockReset();
});

describe('UserService - getUsers', () => {
  it('returns users', async () => {
    mockData = () => [mockUser];
    const response = await getUsers();
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.data).toEqual([mockUser]);
  });
});

describe('UserService - addUser', () => {
  it('does not create user due to invalid inputs', async () => {
    let user = { ...mockUser, username: '' };
    let response = await addUser(user);
    expect(mockAddUser).toHaveBeenCalledTimes(0);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(ERROR_CODES.INVALID_INPUTS);
    user = { ...mockUser, firstname: '' };
    response = await addUser(user);
    expect(mockAddUser).toHaveBeenCalledTimes(0);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(ERROR_CODES.INVALID_INPUTS);
    user = { ...mockUser, lastname: '' };
    response = await addUser(user);
    expect(mockAddUser).toHaveBeenCalledTimes(0);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error?.code).toEqual(ERROR_CODES.INVALID_INPUTS);
  });

  it('creates the user', async () => {
    const userId = 1;
    mockData = () => ({ ...mockUser, userId });
    const response = await addUser(mockUser);
    expect(mockAddUser).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const createdUser = response.data as User;
    expect(createdUser.userId).toEqual(userId);
  });
});

describe('UserService - getUserByUsername', () => {
  it('does not find the user due to no username provided', async () => {
    let response = await getUserByUsername(undefined);
    expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
    expect(response.data).toBeUndefined();
    response = await getUserByUsername('');
    expect(mockGetUserByUsername).toHaveBeenCalledTimes(2);
    expect(response.data).toBeUndefined();
  });

  it('finds the user', async () => {
    const userId = 1;
    mockData = () => ({ ...mockUser, userId });
    const response = await getUserByUsername(mockUser.username);
    expect(mockGetUserByUsername).toHaveBeenCalledTimes(3);
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    const foundUser = response.data as User;
    expect(foundUser.userId).toEqual(userId);
  });
});
