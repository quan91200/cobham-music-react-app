/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion"
import { useStateValue } from "../Context/StateProvider"
import { actionType } from "../Context/reducer"
import { useEffect } from "react"
import { getAllAlbums } from "../api"

const AlbumContainer = ({ albums }) => {
    const [{ album }, dispatch] = useStateValue()

    useEffect(() => {
        if (!album) {
            getAllAlbums().then((data) => {
                dispatch({ type: actionType.SET_ALBUM, album: data.data })
            });
        }
    }, []);
    return (
        <div>
            <motion.div className="font-semibold text-xl my-5 hover:underline cursor-pointer">Album</motion.div>
            <motion.div className="music-w">
                {albums?.map((data, index) => (
                    <motion.div
                        key={data.id}
                        whileTap={{ scale: 0.8 }}
                        initial={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative w-[210px] px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"

                    >
                        <div className="w-40 h-40 rounded-full drop-shadow-lg overflow-hidden">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={data.imageURL}
                                alt=""
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                        <p className="text-base text-headingColor font-semibold my-2">
                            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                            <span className="block text-sm text-gray-400 my-1">
                                {data.artist}
                            </span>
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default AlbumContainer;