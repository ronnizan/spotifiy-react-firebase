import React from "react";
import { useStateProviderValue } from "../state-provider/StateProvider";
import "./BodyPlayer.css";
import Header from "./header/Header.js";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./song-row/SongRow";

const BodyPlayer = ({ spotify }) => {
  const [{ discoverWeekly,token }, dispatch] = useStateProviderValue();

  const playPlaylist = (id) => {
    console.log("hi!!")
  
    spotify
      .play({
        context_uri: `spotify:playlist:5u1xXhnL0icJvHkFL2fPjr`,
      })
      .then((res) => {
        console.log(res, "ressss");
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          console.log(r);
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  

  return (
    <div className='body'>
      <Header spotify={spotify} />

      <div className='body__info'>
        <img src={discoverWeekly?.images[0].url} alt='' />
        <div className='body__infoText'>
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discoverWeekly?.description}</p>
        </div>
      </div>

      <div className='body__songs'>
        <div className='body__icons'>
          <PlayCircleFilledIcon
            className='body__shuffle'
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>

        {discoverWeekly?.tracks.items.map((item,index) => (
          <SongRow key={index} playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
};

export default BodyPlayer;
