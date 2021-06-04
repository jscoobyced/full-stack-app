export type User = {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  referenceId?: string;
}

export type AuthToken = {
  accessToken: string;
  scope: string;
  expiresIn?: number;
  expiresAt?: number;
}

export type SecureUser = {
  user: User;
  authToken: AuthToken;
}

export const toSecureUser = (user: User,
  scope: string,
  accessToken: string,
  expiresIn?: number,
  expiresAt?: number): SecureUser => ({
    user,
    authToken: {
      accessToken, scope, expiresIn, expiresAt
    },
  });

export const newSecureUser = (): SecureUser => toSecureUser({
  id: 0,
  name: '',
  email: '',
  firstName: '',
  lastName: '',
  referenceId: ''
}, '', '', 0, 0);
