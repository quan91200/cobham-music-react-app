import { Route, Routes } from "react-router-dom";
import {
    DashBoardHome,
    DashboardUser,
    DashboardArtist,
    DashboardSongs,
    DashboardAlbum,
    DashboardNewSong,
    Dashboard,
    Home,
    UserProfile,
    Contact,
    Discovery,
    Login,
    Upload,
    Plans
} from "../components";

const RouteApp = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<DashBoardHome />} />
            <Route path="/user" element={<DashboardUser />} />
            <Route path="/songs" element={<DashboardSongs />} />
            <Route path="/artist" element={<DashboardArtist />} />
            <Route path="/albums" element={<DashboardAlbum />} />
            <Route path="/newSong" element={<DashboardNewSong />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plans" element={<Plans />} />
        </Routes>
    )
}

export default RouteApp