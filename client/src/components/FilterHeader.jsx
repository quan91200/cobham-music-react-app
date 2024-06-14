import { motion } from "framer-motion"
import { useEffect } from "react"
import { isActiveFilterHeader, isNotActiveFilterHeader } from "../utils/styles"
import { actionType } from "../Context/reducer"
import { useStateValue } from "../Context/StateProvider"
import { getAllSongs, getAllAlbums, getAllArtist } from "../api"
import { useTranslation } from "react-i18next"

const FilterHeader = () => {

    const { t } = useTranslation()
    const [{ activeFilter, allSongs, allArtists, allAlbums }, dispatch] = useStateValue();

    const handleChange = (filter) => {
        dispatch({
            type: actionType.SET_ACTIVE_FILTER,
            activeFilter: filter,
        });
    };

    useEffect(() => {
        if (activeFilter === "All") {
            if (!allSongs || allSongs.length === 0) {
                getAllSongs().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: data.data,
                    });
                });
            }

            if (!allArtists || allArtists.length === 0) {
                getAllArtist().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_ARTISTS,
                        allArtists: data.data,
                    });
                });
            }

            if (!allAlbums || allAlbums.length === 0) {
                getAllAlbums().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_ALBUMS,
                        allAlbums: data.data,
                    });
                });
            }
        } else if (activeFilter === "Music" && (!allSongs || allSongs.length === 0)) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        } else if (activeFilter === "Podcasts") {
            // Fetch podcasts if needed
        }
    }, [activeFilter, dispatch, allSongs, allArtists, allAlbums]);
    return (
        <motion.div className="m-4 p-4">
            <motion.ul className="flex items-center gap-x-4">
                <motion.li
                    className={activeFilter === "All" ? isActiveFilterHeader : isNotActiveFilterHeader}
                    onClick={() => handleChange("All")}
                >
                    {t('all')}
                </motion.li>
                <motion.li
                    className={activeFilter === "Music" ? isActiveFilterHeader : isNotActiveFilterHeader}
                    onClick={() => handleChange("Music")}
                >
                    {t('music')}
                </motion.li>
                <motion.li
                    className={activeFilter === "Podcasts" ? isActiveFilterHeader : isNotActiveFilterHeader}
                    onClick={() => handleChange("Podcasts")}
                >
                    {t('podcast')}
                </motion.li>
            </motion.ul>
        </motion.div>
    )
}


export default FilterHeader