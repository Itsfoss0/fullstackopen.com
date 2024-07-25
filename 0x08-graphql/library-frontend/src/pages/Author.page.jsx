import { useQuery } from '@apollo/client';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { ALL_AUTHORS } from '../graphql/operations';
const Authors = () => {
  const { loading, data, error } = useQuery(ALL_AUTHORS);
  if (loading) return <h2>Loading...please wait</h2>;
  if (error) return <h2>An error occured {error.message}</h2>;
  const authors = data.authors;
  return (
    <Container>
      <Row>
        <Col>
          <h2 className='my-4'>Authors</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Born</th>
                <th>Books</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Authors;
