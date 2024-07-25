import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form
} from 'react-bootstrap';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../graphql/operations';

const Authors = () => {
  const { loading, data, error } = useQuery(ALL_AUTHORS);
  const [showModal, setShowModal] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    }
  });

  if (loading) return <h2>Loading...please wait</h2>;
  if (error) return <h2>An error occurred: {error.message}</h2>;

  const authors = data.authors;

  const handleEditClick = (author) => {
    setCurrentAuthor(author);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAuthor(null);
  };

  const handleSaveChanges = async () => {
    const payload = {
      author: currentAuthor.name,
      setBornTo: parseInt(currentAuthor.born)
    };
    await editAuthor({ variables: payload });
    handleCloseModal();
  };

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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.name}>
                  <td>{author.name}</td>
                  <td>{author.born}</td>
                  <td>{author.bookCount}</td>
                  <td>
                    <Button
                      variant='primary'
                      onClick={() => handleEditClick(author)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentAuthor && (
            <Form>
              <Form.Group controlId='formAuthorName'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={currentAuthor.name} readOnly />
              </Form.Group>
              <Form.Group controlId='formAuthorBorn'>
                <Form.Label>Born</Form.Label>
                {/* value prop  should not be null, assing an empty string for authors that
                dont have a YOB on their profile from the backend to remove console warnings*/}
                <Form.Control
                  type='text'
                  value={currentAuthor.born === null ? '' : currentAuthor.born}
                  onChange={(e) =>
                    setCurrentAuthor({ ...currentAuthor, born: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId='formAuthorBooks'>
                <Form.Label>Books</Form.Label>
                <Form.Control
                  type='number'
                  value={currentAuthor.bookCount}
                  readOnly
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Authors;
