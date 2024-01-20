const Filter = ({ filter, updateFilter }) => {
    return (
        <div>
            filter show with <input value={filter} onChange={updateFilter} />
        </div>
    );
};

export default Filter;
