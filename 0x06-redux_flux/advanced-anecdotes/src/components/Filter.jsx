import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const filterAnecdotes = (what) => {
    dispatch(filterChange(what));
  };

  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      Filter:
      <input
        type="text"
        name="filter"
        onChange={(event) => {
          filterAnecdotes(event.target.value);
        }}
      />
    </div>
  );
};

export default Filter;
