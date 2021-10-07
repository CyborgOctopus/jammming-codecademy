import React, { useState, useEffect } from 'react';
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from "../../util/Spotify";
import './App.css';

const App = () => {
    const [ searchResults, setSearchResults ] = useState([]);
    const [ playlistName, setPlaylistName ] = useState('Tunes for When the Old Ones Return');
    const [ playlistTracks, setPlaylistTracks ] = useState([]);

    // Performs the initial redirect to the spotify authorization endpoint so that the access token can be
    // retrieved next time Spotify.getAccessToken() is called.
    useEffect(() => Spotify.getAccessToken(), []);

    const addTrack = track => {
        if (!playlistTracks.map(playlistTrack => playlistTrack.id).includes(track.id)) {
            setPlaylistTracks(prevPlaylistTracks => [...prevPlaylistTracks, track]);
        }
    };

    const removeTrack = track => {
        setPlaylistTracks(prevPlaylistTracks => prevPlaylistTracks.filter(
            playlistTrack => playlistTrack.id !== track.id
        ));
    };

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, trackURIs).then(() => {
            setPlaylistName('New Playlist');
            setPlaylistTracks([]);
        });
    };

    const search = searchTerm => {
        Spotify.search(searchTerm).then(results => {
            setSearchResults(results);
        });
    };

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={search} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
                name={playlistName}
                tracks={playlistTracks}
                onRemove={removeTrack}
                onNameChange={setPlaylistName}
                onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
    );
}

export default App;
