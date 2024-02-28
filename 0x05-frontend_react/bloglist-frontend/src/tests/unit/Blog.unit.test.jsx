import React from "react";
import UserEvent, { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import "jest-localstorage-mock";
import Blog from "../../components/Blog";
import blogs from "../../services/blogs";

describe("<Blog/> component", () => {
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify({ accessToken: "test_token" }));
    // spy on blog services
    jest.spyOn(blogs, "modifyBlog");
    jest.spyOn(blogs, "deleteBlog");

    // create a dummy blog object
    const blog = {
      id: 1,
      title: "Docker",
      author: "John Doe",
      url: "https://test.com",
      likes: 0,
    };

    render(<Blog blog={blog} />);
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test("renders the blog title by default", async () => {
    const content = await screen.findByText(/docker/i);

    expect(content).toBeDefined();
  });

  test('expands blog details when "View" button is clicked', async () => {
    const user = userEvent.setup();
    const viewBtn = await screen.findByText(/view/i);
    user.click(viewBtn);
    const hideBtn = await screen.findByText(/hide/i);
    const urlDiv = await screen.findByText("https://test.com");

    expect(viewBtn).toBeDefined();
    expect(hideBtn).toBeDefined();
    expect(urlDiv).toBeDefined();
  });

  test('hides blog details when "Hide" button is clicked', async () => {
    const user = userEvent.setup();
    const viewBtn = await screen.findByText(/view/i);
    await user.click(viewBtn);
    const hideBtn = await screen.findByText(/Hide/i);
    await user.click(hideBtn);
    await waitFor(() => {
      expect(screen.findByText(/view/)).toBeDefined();
    });
    await waitFor(() => {
      expect(screen.queryByText("https://test.com")).toBeNull();
    });
  });

  test('calls likeBlog when "Like" button is clicked', async () => {
    const user = userEvent.setup();
    const viewBtn = await screen.findByText(/view/i);
    await user.click(viewBtn);
    const likeBtns = await screen.findAllByText(/Like/i, { exact: true });
    await user.click(likeBtns[1]);
    await waitFor(() => expect(blogs.modifyBlog).toHaveBeenCalledTimes(1));
  });

  test('calls deleteBlog when "Delete" button is clicked and confirmed', async () => {
    window.confirm = jest.fn(() => true);
    const user = userEvent.setup();
    const viewBtn = await screen.findByText(/view/i);
    await user.click(viewBtn);
    const dltBtn = await screen.findByText(/delete/i);
    await user.click(dltBtn);
    expect(dltBtn).toBeDefined();
    await waitFor(() => expect(blogs.deleteBlog).toHaveBeenCalledTimes(1));
  });

  test('does not call deleteBlog when "Delete" button is clicked but not confirmed', async () => {
    window.confirm = jest.fn(() => false);
    const user = userEvent.setup();
    const viewBtn = await screen.findByText(/view/i);
    await user.click(viewBtn);
    const dltBtn = await screen.findByText(/delete/i);
    await user.click(dltBtn);
    await waitFor(() => expect(blogs.modifyBlog).not.toHaveBeenCalled());
  });
});
