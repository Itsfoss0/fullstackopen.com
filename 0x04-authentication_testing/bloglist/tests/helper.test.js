#!/usr/bin/env node

/* unittest for the utilty helper functions */

const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
} = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe('Total Likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals to the likes of that', () => {
    expect(totalLikes([{ likes: 3 }])).toBe(3);
  });

  test('of a bigger blog list are culculated right', () => {
    const blogs = [{ likes: 8 }, { likes: 4 }, { likes: 4 }];
    expect(totalLikes(blogs)).toBe(16);
  });
});

describe('Favorite Blog', () => {
  test('when list has only one blog, equals to the only one', () => {
    const blogs = [{ likes: 3 }];
    expect(favoriteBlog(blogs)).toEqual(blogs[0]);
  });

  test('when list has mulitple blogs, equals the correct one', () => {
    const blogs = [{ likes: 3 }, { likes: 5 }];
    expect(favoriteBlog(blogs)).toEqual(blogs[1]);
  });

  test('when list has mulitple blogs with the same likes, equals the first one', () => {
    const blogs = [{ likes: 3 }, { likes: 5 }, { likes: 5 }];
    expect(favoriteBlog(blogs)).toEqual(blogs[1]);
  });

  test("when list doesn't have any blogs, is none", () => {
    const blogs = [];
    expect(favoriteBlog(blogs)).toEqual(blogs[0]);
  });
});

describe('Author', () => {
  test('with the most blogs', () => {
    const blogs = [
      { author: 'Robert Greene' },
      { author: 'Robert Greene' },
      { author: 'Robert Greene' },
      { author: 'Maxweel Lord' },
      { author: 'Sir. Author Conan Doyle' }
    ];

    const expected = { author: 'Robert Greene', blogs: 3 };
    expect(mostBlogs(blogs)).toEqual(expected);
  });
});
