import React, { useEffect } from "react";
import "./App.css";
import Login from "./login/Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebAPI from "spotify-web-api-js";
import Player from "./player/Player";
import { useStateProviderValue } from "./state-provider/StateProvider";

const spotify = new SpotifyWebAPI();

function App() {
  const [{ user, token }, dispatch] = useStateProviderValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({ type: "SET_TOKEN", token: _token });
      
      spotify
        .getPlaylist("27KYxL0VpBgipAZTkYrlwk")
        .then((response) =>
          dispatch({ type: "SET_DISCOVER_WEEKLY", discoverWeekly: response })
        );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({ type: "SET_USER", user });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({ type: "SET_PLAYLISTS", playlists: playlists });
      });


    }
  }, [token, dispatch]);

  return (
    <div className='app'>
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
