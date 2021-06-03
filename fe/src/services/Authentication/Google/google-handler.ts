import { getGoogleParams } from "../../../config/constants";
import { AuthenticationProperties, IAuthenticationHandler } from "../handler";
import Loader from "./loader";

export class GoogleAuthenticationHandler implements IAuthenticationHandler {
  private loader = new Loader();

  private properties: AuthenticationProperties = {} as AuthenticationProperties;

  /* istanbul ignore next */
  public init = (properties: AuthenticationProperties) => {
    this.properties = properties;
    this.loader.registerEvent('jsc', () => {
      if (gapi) {
        gapi.load('client:auth2', this.initGoogle);
      }
    });
    this.loader.load(document,
      'jsc-google-login',
      'https://apis.google.com/js/api.js?onload=jscGoogleApi',
      'jsc',
      'jscGoogleApi');
  }

  private initGoogle = () => {
    if (gapi && gapi.auth2 && !gapi.auth2.getAuthInstance()) {
      const googleParams = getGoogleParams();
      gapi.auth2.init(googleParams).then(
        async (response: gapi.auth2.GoogleAuth) => {
          if (response.isSignedIn.get()) {
            const user = await this.properties.createUser(response.currentUser.get());
            this.properties.doSignIn(user);
          }
        },
        (error: any) => this.properties.doSignOut(),
      );
    }
  }

  public signIn = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    if (gapi && gapi.auth2) {
      gapi.auth2.getAuthInstance().signIn({}).then(
        async (response: gapi.auth2.GoogleUser) => {
          const user = await this.properties.createUser(response);
          this.properties.doSignIn(user);
        },
        (error: any) => this.properties.doSignOut(),
      );
    }
  };

  public signOut = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    if (gapi && gapi.auth2) {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(
        auth2.disconnect().then(() => {
          this.properties.doSignOut();
        }),
      );
    }
  };
}