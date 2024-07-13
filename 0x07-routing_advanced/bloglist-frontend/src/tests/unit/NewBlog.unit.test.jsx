import UserEvent, { userEvent } from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import 'jest-localstorage-mock';
import blogs from '../../services/blogs';
import NewBlog from '../../components/NewBlog';

describe('<NewBlog/> component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ accessToken: 'test_token' }));
    jest.spyOn(blogs, 'createNew');
    render(<NewBlog />);
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('renders all the fields', () => {
    const header = screen.getByText(/Add another blog/i);
    const title = screen.getByText(/Title/i);
    const author = screen.getByText(/Author/i);
    const url = screen.getByText(/Link/i);
    const createBtn = screen.getByText(/Create/i);

    expect(header).toBeDefined();
    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeDefined();
  });

  test('adds a new blog when created', async () => {
    // todo: verify the arguments that the spy was called with
    const user = userEvent.setup();
    const createBtn = screen.getByText(/Create/i);
    await user.click(createBtn);
    await waitFor(() => expect(blogs.createNew).toHaveBeenCalledTimes(1));
  });
});
