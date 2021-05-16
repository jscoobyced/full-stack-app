import { render, screen, waitFor } from '@testing-library/react';
import { ServiceContext } from '../../../services/Context';
import { MockUserService } from '../../../services/User/mock';
import { Main } from './main';

const userService = MockUserService();

describe('Main component', () => {
  it('can render', async () => {
    const { unmount } = render(<ServiceContext.Provider value={{ userService }}>
      <Main />
    </ServiceContext.Provider>);
    await waitFor(() => {
      const listElement = screen.getByText(/John/i);
      expect(listElement).toBeInTheDocument();
    }, { interval: 100, timeout: 1000 });
    unmount();
  })
})
