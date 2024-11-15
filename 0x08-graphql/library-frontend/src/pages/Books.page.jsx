import { useQuery } from "@apollo/client";
import { Table, Container, Row, Col } from "react-bootstrap";
import { ALL_BOOKS } from "../graphql/operations";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const BooksPage = () => {
  const [displayFilter, setDisplayFilter] = useState(null);
  const { loading, data, error } = useQuery(ALL_BOOKS);
  const tags = [];

  const allBooks = data?.books || [];
  for (const book of allBooks) {
    for (const tag of book.genres) {
      tags.push(tag);
    }
  }

  const books = displayFilter
    ? allBooks.filter((book) => book.genres.includes(displayFilter))
    : allBooks;

  const filters = [...new Set(tags)];

  console.log(filters);

  const filterBooks = (tag) => {
    setDisplayFilter(tag);
  };

  if (loading) return <h2>Loading...please wait</h2>;
  if (error) return <h2>An error occured {error.message}</h2>;

  return (
    <>
      <Container>
        <Row>
          <Col>
            {displayFilter ? (
              <h2 className="my-4"> Books on {displayFilter}</h2>
            ) : (
              <h2 className="my-4">All Books</h2>
            )}
            {filters.map((tag) => (
              <Button
                className="mx-2 mb-2"
                variant="secondary"
                key={tag}
                onClick={() => filterBooks(tag)}
              >
                {tag}
              </Button>
            ))}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Published</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author?.name || JSON.stringify(book.author)}</td>
                    <td>{book.published}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <NavLink to="/books/new" className="nav-link">
        <Button className="mx-2" variant="primary">
          New Book
        </Button>
      </NavLink>
    </>
  );
};

export default BooksPage;
