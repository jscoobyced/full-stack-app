import { useEffect, useState } from "react";
import { newSecureUser, SecureUser } from "../../../models/user";
import { IAuthenticationHandler } from "../../../services/Authentication/handler";

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

  const handlerProps = {
    isSignedIn,
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
  const { signIn, signOut, init } = handler;

  useEffect(() => {
    init(handlerProps);
  });

  return (
    <span
      role="none"
      className={`signin-button signed-in_${isSignedIn}`}
      onClick={isSignedIn ? signOut : signIn}
    >
      {buttonName}
    </span>
  );
};

export default SignInButton;