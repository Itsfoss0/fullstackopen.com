db.authors.insertMany([
  {
    name: "Robert Martin",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky",
  },
  {
    name: "Sandi Metz",
  },
]);

db.books.insertMany([
  {
    title: "Clean Code",
    published: 2008,
    author: ObjectId('67373a35074d55b565a26a13'),
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: ObjectId('67373a35074d55b565a26a13'),
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: ObjectId('67373a35074d55b565a26a14'),
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: ObjectId('67373a35074d55b565a26a16'),
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: ObjectId('67373a35074d55b565a26a17'),
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: ObjectId('67373a35074d55b565a26a15'),
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: ObjectId('67373a35074d55b565a26a15'),
    genres: ["classic", "revolution"],
  },
]);
