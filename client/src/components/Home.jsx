import {
  Header,
  SongContainer,
  AlbumContainer,
} from "../components"
import { useStateValue } from "../Context/StateProvider";

const Home = () => {
  const [{
    filteredSongs,
    filteredAlbums,
    allSongs,
    allAlbums,
    activeFilter
  }] = useStateValue();
  return (
    <div className="w-full h-auto flex-col items-center justify-center bg-primary">
      <Header />
      <div className="containeR mx-auto my-3 justify-center">
        {activeFilter === "All" && (
          <div className="flex flex-col-reverse">
            <SongContainer musics={filteredSongs ? filteredSongs : allSongs} />
            <AlbumContainer albums={filteredAlbums ? filteredAlbums : allAlbums} />
          </div>
        )}
        {activeFilter === "Music" && (
          <div>
            <SongContainer musics={filteredSongs ? filteredSongs : allSongs} />
          </div>
        )}
        {activeFilter === "Podcasts" && (
          <div>
            {/** */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
