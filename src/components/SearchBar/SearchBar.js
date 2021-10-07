import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const handleTermChange = e => {
        e.preventDefault();
        onSearch(e.target.value);
    };

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
        </div>
    );
};

export { SearchBar };
