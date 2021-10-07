import './Playlist.css';
import { TrackList } from "../TrackList/TrackList";

const Playlist = ({ name, tracks, onRemove, onNameChange, onSave }) => {
    const handleNameChange = e => {
        e.preventDefault();
        onNameChange(e.target.value);
    };

    return (
        <div className="Playlist">
            <input defaultValue={"New Playlist"} value={name} onChange={handleNameChange} />
            <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
             <button className="Playlist-save" onClick={onSave} >SAVE TO SPOTIFY</button>
        </div>
    );
};

export { Playlist };
