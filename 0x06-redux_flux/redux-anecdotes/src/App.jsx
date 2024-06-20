import { NewAnecDote, Anecdotes } from './components/Anecdotes';
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecDote />
    </div>
  );
};

export default App;
