import { render, screen } from '@testing-library/react';
import User from '../../components/User';

jest.mock('../../services/auth', () => ({
  logout: jest.fn()
}));

describe('<User/> Test case', () => {
  beforeEach(() => {
    const user = {
      username: 'itsfoss0',
      userId: 'udswh782ds90lmc'
    };
    render(<User user={user} />);
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('renders the username to screen', () => {
    const user = screen.getByText(/itsfoss0/i);
    expect(user).toBeDefined();
  });
});
