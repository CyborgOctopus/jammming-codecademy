import './Track.css';

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
    const addTrack = e => {
        e.preventDefault();
        onAdd(track);
    };

    const removeTrack = e => {
        e.preventDefault();
        onRemove(track);
    };

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.author} | {track.album}</p>
            </div>
            <button
                className="Track-action"
                onClick={isRemoval ? removeTrack : addTrack} >
                {isRemoval ? '-' : '+'}
            </button>
        </div>
    );
};

export { Track };
