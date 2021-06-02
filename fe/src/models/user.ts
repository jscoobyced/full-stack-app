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

export const toSecureUser = (id: number,
  name: string,
  email: string,
  referenceId: string,
  accessToken: string,
  scope: string,
  firstName?: string,
  lastName?: string,
  expiresIn?: number,
  expiresAt?: number): SecureUser => ({
    user: {
      id, name, firstName, lastName, email, referenceId
    },
    authToken: {
      accessToken, scope, expiresIn, expiresAt
    },
  });

export const newSecureUser = (): SecureUser => toSecureUser(
  0, '', '', '', '', '', '', '', 0, 0,
);
