import React from "react";
import SidebarOption from "../sidebar-option/SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import "./Sidebar.css";
import { useStateProviderValue } from "../state-provider/StateProvider";
const Sidebar = () => {
  const [{ playlists,spotify }, dispatch] = useStateProviderValue();

  const ChangePlaylist = (playlistHref) => {
    const playlistId = playlistHref.split("/")[5];
    spotify
    .getPlaylist(playlistId)
    .then((response) =>
      dispatch({ type: "SET_DISCOVER_WEEKLY", discoverWeekly: response })
    );
  };




  return (
    <div className='sidebar'>
      <img
        className='sidebar__logo'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPUf4jA7oFZQ2sZJxrqaDpABm1plnGddnE0A&usqp=CAU'
        alt=''
      />
      <SidebarOption Icon={HomeIcon} title='Home' />
      <SidebarOption Icon={SearchIcon} title='Search' />
      <SidebarOption Icon={LibraryMusicIcon} title='Your Library' />
      <br />
      <strong className='sidebar__title'>PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption
          key={playlist.name}
          title={playlist.name}
          onClickFunction={ChangePlaylist}
          hrefPlaylist ={playlist.href}
        />
      ))}
    </div>
  );
};

export default Sidebar;
