// Constants
const clientId = '69ab376cddd14809a16c0af066b4b95b';
const state = 'qpXBmNo5ApedsO3OJdhO';  // Thanks, Random.org!
const redirectURI = 'http://localhost:3000/';

let accessToken;

const Spotify = {
    getAccessToken: () => {
        console.log('Getting access token...');
        console.log('Access Token: ' + accessToken);
        console.log('Window location: ' + window.location.href);
        if (accessToken) {
            console.log('Access token returned!');
            return accessToken;
        }

        // All URL parsing info from the Spotify API documentation:
        // https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = parseInt(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log('Access token set');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token`
            + `&redirect_uri=${redirectURI}&state=${state}&scope=playlist-modify-public`;
            console.log('Getting window location after set with auth');
            console.log(window.location.href);
            console.log('Window location logged.');
            //console.log('Calling again...');
            //return Spotify.getAccessToken();
        }
    },

    search: searchTerm => {
        console.log('Searching...');
        const accessToken = Spotify.getAccessToken();
        console.log('Access token inside Spotify.search');
        console.log(accessToken);
        console.log('Token logged');

        return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => response.json()).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                console.log('no tracks');
                return [];
            }

            console.log('JSON response');
            console.log(jsonResponse);
            console.log('response logged');

            const responseTracks = jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                author: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))

            console.log('Responses');
            console.log(responseTracks);
            console.log('Responses logged');

            return responseTracks;
        });
    },

    savePlaylist: (name, trackURIs) => {
        if (typeof name === 'undefined' || typeof trackURIs === 'undefined') {
            return;
        }

        const accessToken = Spotify.getAccessToken();

        const headers = {
            'Authorization': 'Bearer ' + accessToken
        };

        let userId;
        let playlistId;

        // GET user id
        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(
            response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;

            // POST with user ID to create playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: name })
            }).then(response => response.json()).then(jsonResponse => {
                playlistId = jsonResponse.id

                // POST with playlist ID to add tracks
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ uris: trackURIs })
                }).then(response => response.json()).then(jsonResponse => playlistId = jsonResponse.id);
            });
        });
    }
};

export default Spotify;
