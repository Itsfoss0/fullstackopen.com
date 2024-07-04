import { Route, Routes } from 'react-router-dom';
import About from '../components/About';
import AnecdoteList from '../components/AnecdoteList';
import CreateNew from '../components/NewAnecdote';
import Anecdote from '../components/Anecdote';
import NotFound from '../components/NotFound';

const AnecdoteRouter = () => {
  return (
    <Routes>
      <Route index path='/' element={<AnecdoteList />} />
      <Route path='/anecdotes/:id' element={<Anecdote />} />
      <Route path='/about' element={<About />} />
      <Route path='/create' element={<CreateNew />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AnecdoteRouter;
