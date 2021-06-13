import { fireEvent, render, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { mockContext } from "../../../services/Context/mock";
import { English } from "../../../services/i18n/language";
import SignInButton from "./SignInButton"

const { userService, handler } = mockContext();
const translations = English;

describe('Google Sign-in button', () => {
  it('can render button, sign-in and sign-out', async () => {
    const setUser = jest.fn();
    const { container, unmount } = render(<SignInButton
      userService={userService}
      handler={handler}
      setUser={setUser}
      translations={translations}
    ></SignInButton>);
    const buttons = container.getElementsByClassName('signin-button');
    expect(buttons.length).toEqual(1);
    const button = buttons[0];
    expect(button.innerHTML).toEqual(English.SignIn);
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(button.innerHTML).toEqual(English.SignOut);
      expect(setUser).toHaveBeenCalledTimes(1);
    });
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(button.innerHTML).toEqual(English.SignIn);
      expect(setUser).toHaveBeenCalledTimes(2);
    });
    unmount();
  });
});
