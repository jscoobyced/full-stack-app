export type User = {
  id: number;
  name: string;
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
  expiresIn?: number,
  expiresAt?: number): SecureUser => ({
    user: {
      id, name, email, referenceId
    },
    authToken: {
      accessToken, scope, expiresIn, expiresAt
    },
  });

export const newSecureUser = (): SecureUser => toSecureUser(
  0, '', '', '', '', '', 0, 0,
);
