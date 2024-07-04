import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import AnecdoteRouter from './router/AnecdoteRoutes';

const App = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Navigation />
      <Notification />
      <AnecdoteRouter />
      <Footer />
    </div>
  );
};

export default App;
