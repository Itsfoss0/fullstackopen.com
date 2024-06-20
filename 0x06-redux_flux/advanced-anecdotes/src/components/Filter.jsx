import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const filterAnecdotes = (what) => {
    dispatch(filterChange(what));
  };

  return (
    <>
      Filter: 
      <input
        type='text'
        name='filter'
        onChange={(event) => {
          filterAnecdotes(event.target.value);
        }}
      />
    </>
  );
};

export default Filter;
