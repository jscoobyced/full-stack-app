import { fireEvent, render, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { mockContext } from "../../../services/Context/mock";
import SignInButton from "./google"

const signInText = 'Sign-In'
const signOutText = 'Sign-Out';
const { userService, handler } = mockContext();

describe('Google Sign-in button', () => {
  it('can render button, sign-in and sign-out', async () => {
    const setUser = jest.fn();
    const { container, unmount } = render(<SignInButton
      userService={userService}
      handler={handler}
      setUser={setUser}
      signInText={signInText}
      signOutText={signOutText}
    ></SignInButton>);
    const buttons = container.getElementsByClassName('signin-button');
    expect(buttons.length).toEqual(1);
    const button = buttons[0];
    expect(button.innerHTML).toEqual(signInText);
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(button.innerHTML).toEqual(signOutText);
      expect(setUser).toHaveBeenCalledTimes(1);
    });
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(button.innerHTML).toEqual(signInText);
      expect(setUser).toHaveBeenCalledTimes(2);
    });
    unmount();
  });
})