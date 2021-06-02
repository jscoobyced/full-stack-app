import { fireEvent, render } from "@testing-library/react"
import { mockContext } from "../../../services/Context/mock";
import SignInButton from "./google"

const signInText = 'Sign-In'
const signOutText = 'Sign-Out';
const { createUser, handler } = mockContext();

describe('Google Sign-in button', () => {
  it('can render button, sign-in and sign-out', () => {
    const setUser = jest.fn();
    const { container, unmount } = render(<SignInButton
      createUser={createUser}
      handler={handler}
      setUser={setUser}
      signInText={signInText}
      signOutText={signOutText}
    ></SignInButton>);
    const buttons = container.getElementsByClassName('signin-button');
    expect(buttons.length).toEqual(1);
    const button = buttons[0];
    expect(button.innerHTML).toEqual(signInText);
    fireEvent.click(button);
    expect(button.innerHTML).toEqual(signOutText);
    expect(setUser).toHaveBeenCalledTimes(1);
    fireEvent.click(button);
    expect(button.innerHTML).toEqual(signInText);
    expect(setUser).toHaveBeenCalledTimes(2);
    unmount();
  });
})