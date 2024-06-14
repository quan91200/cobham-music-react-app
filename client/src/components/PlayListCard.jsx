
import { getAllSongs } from "../api";
import { IoMusicalNote } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";
import { actionType } from "../Context/reducer";
import { RiPlayListFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const PlayListCard = () => {

    const { t } = useTranslation()
    const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }
    }, [allSongs, dispatch]);

    const setCurrentPlaySong = (songindex) => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            });
        }
        if (song !== songindex) {
            dispatch({
                type: actionType.SET_SONG,
                song: songindex,
            });
        }
    };
    const [isWidth, setIsWidth] = useState(window.innerWidth <= 1080)

    useEffect(() => {
        const handleResize = () => {
            setIsWidth(window.innerWidth <= 1080);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            <motion.i
                className="flex items-center px-4 cursor-pointer py-2 hover:opacity-75 justify-between"
            >
                <div className="flex items-center gap-2">
                    <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl" />
                    <h3 className="text-lg">{t('playlist')}</h3>
                </div>
            </motion.i>
            <motion.div className="overflow-y-auto h-[80vh]">
                {allSongs.length > 0 ? (
                    allSongs.map((music, index) => (
                        <motion.div
                            initial={{ opacity: 0, translateY: -50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${music?._id === song._id ? "bg-card" : "bg-transparent"
                                }`}
                            onClick={() => setCurrentPlaySong(index)}
                        >
                            {isWidth ? (
                                <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
                            ) : (
                                <div className="w-16 h-16 min-h-16 min-w-16 rounded-lg drop-shadow-lg relative overflow-hidden">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        src={music.imageURL}
                                        alt=""
                                        className=" w-full h-full rounded-lg object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex items-start flex-col">
                                <p className="text-lg text-headingColor font-semibold">
                                    {`${music?.name.length > 35
                                        ? music?.name.slice(0, 35)
                                        : music?.name
                                        }`}{" "}
                                </p>
                                <p className="text-textColor">
                                    {music?.artist}{" "}
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <>Not Found</>
                )}
            </motion.div>
        </div>
    );
};

export default PlayListCard