import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Card>
      <Card.Header>Not found</Card.Header>
      <Card.Body>
        <Card.Title>404! Page not found </Card.Title>
        <Card.Text>
          The page you are looking for does not exists, click below to go back
          home
        </Card.Text>
        <Link to='/'>
          <Button variant='primary'>Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default NotFoundPage;
