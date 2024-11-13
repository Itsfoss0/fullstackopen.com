import { useQuery } from '@apollo/client';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { ALL_BOOKS } from '../graphql/operations';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

const BooksPage = () => {
  const { loading, data, error } = useQuery(ALL_BOOKS);
  
  if (loading) return <h2>Loading...please wait</h2>;
  if (error) return <h2>An error occured {error.message}</h2>;
  
  const books = data?.books || [];

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2 className='my-4'>Books</h2>
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
      <NavLink to='/books/new' className='nav-link'>
        <Button className='mx-2' variant='primary'>New Book</Button>
      </NavLink>
    </>
  );
};

export default BooksPage;