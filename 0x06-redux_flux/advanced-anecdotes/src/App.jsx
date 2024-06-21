import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAll } from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispath = useDispatch();

  useEffect(() => {
    getAll().then((data) => dispath(setAnecdotes(data)));
  });
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
