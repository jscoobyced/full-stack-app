import { newSecureUser, SecureUser } from "../../models/user";

export type AuthenticationProperties = {
  doSignIn: (user: SecureUser) => void;
  doSignOut: () => void;
  createUser: (user: any) => SecureUser;
}

export interface IAuthenticationHandler {
  init: (properties: AuthenticationProperties) => void;
  signIn: (event: any) => void;
  signOut: (event: any) => void;
}

export class AuthenticationHandler implements IAuthenticationHandler {
  private properties: AuthenticationProperties = {} as AuthenticationProperties;

  public init = (properties: AuthenticationProperties) => {
    console.log('Calling init...', properties);
    this.properties = properties;
  }

  /**
   * Default handler simply creates an empty user
   */
  public signIn = ((event: any) => {
    if (event) {
      event.preventDefault();
    }
    this.properties.doSignIn(this.properties.createUser(newSecureUser()));
  });

  public signOut = ((event: any) => {
    if (event) {
      event.preventDefault();
    }
    this.properties.doSignOut();
  });

  public getLogo = (): any => '(N) '
}
