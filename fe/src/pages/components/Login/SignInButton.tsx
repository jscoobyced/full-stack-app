import { useEffect, useState } from "react";
import { newSecureUser, SecureUser } from "../../../models/user";
import { IUserService } from "../../../services/Authentication";
import { IAuthenticationHandler } from "../../../services/Authentication/handler";
import { LanguageContent } from "../../../services/i18n/language";
import './SignInButton.css';

const SignInButton = (properties: {
  setUser: (user: SecureUser) => void,
  userService: IUserService,
  handler: IAuthenticationHandler;
  translations: LanguageContent;
}) => {
  const {
    setUser, handler, userService, translations
  } = properties;

  const { createUser, userLogin } = userService;
  const [isSignedIn, setSignedIn] = useState(false);
  const { signIn, signOut } = handler;

  useEffect(() => {
    const updateButton = (buttonSignedIn: boolean) => {
      setSignedIn(buttonSignedIn);
    };
    const handlerProps = {
      doSignIn: (user: SecureUser) => {
        updateButton(true);
        setUser(user);
      },
      doSignOut: () => {
        setUser(newSecureUser());
        updateButton(false);
      },
      createUser,
      userLogin,
    };
    const { init } = handler;
    init(handlerProps);
  }, [createUser, handler, setUser, userLogin]);

  return (
    <span
      className={`signin-button`}
      onClick={isSignedIn ? signOut : signIn}
    >
      {isSignedIn ? translations.SignOut : translations.SignIn}
    </span>
  );
};

export default SignInButton;
