import { Route, Routes } from 'react-router-dom';
import NewBook from '../components/NewBook';
import Authors from '../pages/Author.page';
import BooksPage from '../pages/Books.page';
import NotFoundPage from '../pages/NotFound.page';

const LibraryRoutes = () => {
  return (
    <Routes>
      <Route index path='/' element={<Authors />} />
      <Route path='/books' element={<BooksPage />} />
      <Route path='/books/new' element={<NewBook />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default LibraryRoutes;
