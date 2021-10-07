import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

const SearchResults = ({ searchResults, onAdd }) => {
    console.log('Logging results inside SearchResults object');
    console.log(searchResults);
    console.log('Results logged');
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
        </div>
    );
};

export { SearchResults };
