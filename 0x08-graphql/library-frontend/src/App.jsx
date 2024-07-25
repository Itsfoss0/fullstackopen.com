import Navigation from './components/Navigation';
import LibraryRoutes from './routes/libraryRoutes';

const App = () => {
  return (
    <div className='container mt-3'>
      <Navigation />
      <LibraryRoutes />
    </div>
  );
};

export default App;
