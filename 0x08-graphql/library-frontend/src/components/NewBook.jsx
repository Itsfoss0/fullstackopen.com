import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../graphql/operations';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
  const navigate = useNavigate();
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.message);
    }
  });
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const payload = {
      ...data,
      published: parseInt(data.published),
      genres
    };
    await addBook({ variables: payload });
    setGenres([]);
    setCurrentGenre('');
    navigate('/');
  };

  const addGenre = (event) => {
    event.preventDefault();
    if (currentGenre.trim() !== '') {
      setGenres([...genres, currentGenre]);
      setCurrentGenre('');
    }
  };

  return (
    <Container className='my-4'>
      <Row>
        <Col>
          <h2>Add New Book</h2>
          <Form onSubmit={submit}>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                id='title'
                placeholder='Enter book title'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                name='author'
                id='author'
                placeholder="Enter author's name"
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Published</Form.Label>
              <Form.Control
                type='number'
                name='published'
                id='published'
                placeholder='Enter publication year'
              />
            </Form.Group>
            <Form.Group className='mb-1'>
              <Form.Label>Genre</Form.Label>
              <div className='d-flex align-items-center'>
                <Form.Control
                  type='text'
                  placeholder='Enter genre'
                  className='me-2'
                  value={currentGenre}
                  onChange={(e) => setCurrentGenre(e.target.value)}
                />
                <Button variant='primary' onClick={addGenre} type='button'>
                  Add Genre
                </Button>
              </div>
            </Form.Group>
            <div>
              <Form.Text className='text-muted mb-3'>
                Genres: {genres.join(', ')}
              </Form.Text>
            </div>
            <Button variant='success' type='submit'>
              Create Book
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewBook;
