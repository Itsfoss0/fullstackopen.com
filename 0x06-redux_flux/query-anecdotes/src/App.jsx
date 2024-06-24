import AnecdoteForm from './components/AnecdoteForm';
import Anecdote from './components/Anecdotes';
import Notification from './components/Notification';
import { NotificationContextProvider } from './context/notificationReducer';
import { useQuery } from '@tanstack/react-query';
import { getAllNotes } from './services/anecdotes';

const App = () => {
  const anecdotesResults = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAllNotes().then((data) => data),
    refetchOnWindowFocus: false,
    retry: 1
  });

  if (anecdotesResults.isError) {
    return (
      <>
        <h2>Anecdote service not available due to problems with the server</h2>
      </>
    );
  }
  if (anecdotesResults.isLoading) {
    return <div>Fetching data... please wait</div>;
  }
  const anecdotes = anecdotesResults.data;
  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        {anecdotes.map((anc) => {
          return <Anecdote key={anc.id} anec={anc} />;
        })}
        <AnecdoteForm />
      </div>
    </NotificationContextProvider>
  );
};

export default App;
