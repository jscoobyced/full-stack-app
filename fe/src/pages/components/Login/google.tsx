import { useEffect, useState } from "react";
import { newSecureUser, SecureUser } from "../../../models/user";
import { IAuthenticationHandler } from "../../../services/Authentication/handler";
import './google.css';

const SignInButton = (properties: {
  signInText: string,
  signOutText: string,
  setUser: (user: SecureUser) => void,
  createUser: (user: any) => SecureUser,
  handler: IAuthenticationHandler;
}) => {
  const {
    signInText, signOutText, setUser, createUser, handler,
  } = properties;
  const [buttonName, setButtonName] = useState(signInText);
  const [isSignedIn, setSignedIn] = useState(false);

  const updateButton = (buttonSignedIn: boolean, buttonText: string) => {
    setButtonName(buttonText);
    setSignedIn(buttonSignedIn);
  };

  const { signIn, signOut } = handler;

  useEffect(() => {
    const handlerProps = {
      doSignIn: (user: SecureUser) => {
        updateButton(true, signOutText);
        setUser(user);
      },
      doSignOut: () => {
        setUser(newSecureUser());
        updateButton(false, signInText);
      },
      createUser,
    };
    const { init } = handler;
    init(handlerProps);
  }, [createUser, handler, setUser, signInText, signOutText]);

  return (
    <span
      className={`signin-button signed-in_${isSignedIn}`}
      onClick={isSignedIn ? signOut : signIn}
    >
      {buttonName}
    </span>
  );
};

export default SignInButton;