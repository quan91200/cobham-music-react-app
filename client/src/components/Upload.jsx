/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useStateValue } from "../Context/StateProvider"
import { useTranslation } from "react-i18next"
import BtnUpload from "./BtnUpload";

const Upload = () => {

    const { t } = useTranslation()
    const [isFocus, setIsFocus] = useState(false)
    const [songFilter, setSongFilter] = useState("")
    const [{ allSongs }, dispatch] = useStateValue();
    const [filteredSongs, setFilteredSongs] = useState(null)

    useEffect(() => {
        if (songFilter.length > 0) {
            const filtered = allSongs.filter(
                (data) =>
                    data.artist.toLowerCase().includes(songFilter) ||
                    data.language.toLowerCase().includes(songFilter) ||
                    data.name.toLowerCase().includes(songFilter)
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [songFilter]);

    return (
        <div className="w-full flex justify-center items-center gap-24">
            <NavLink
                to={"/dashboard/newSong"}
                className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
            >
                <BtnUpload />
            </NavLink>
            <input
                type="text"
                placeholder={t('search')}
                className={`w-52 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
                    } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
                value={songFilter}
                onChange={(e) => setSongFilter(e.target.value)}
                onBlur={() => setIsFocus(false)}
                onFocus={() => setIsFocus(true)}
            />

            {songFilter && (
                <motion.i
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileTap={{ scale: 0.75 }}
                    onClick={() => {
                        setSongFilter("");
                        setFilteredSongs(null);
                    }}
                >
                    <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
                </motion.i>
            )}
        </div>
    );
}

export default Upload;