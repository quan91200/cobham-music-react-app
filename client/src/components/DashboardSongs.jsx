/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { deleteSongById, getAllSongs } from "../api"
import { useStateValue } from "../Context/StateProvider"
import { actionType } from "../Context/reducer"
import { IoTrash } from "react-icons/io5"
import AlertSuccess from "./AlertSuccess"
import AlertError from "./AlertError"
import { useTranslation } from 'react-i18next'
import BtnDelete from "./BtnDelete"

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("")
  const [filteredSongs, setFilteredSongs] = useState(null)

  const [{ allSongs }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        })
      })
    }
  }, [])

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.language.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered)
    } else {
      setFilteredSongs(null)
    }
  }, [songFilter])
  const { t } = useTranslation()
  return (
    <div className="relative w-full p-4 py-12 border border-gray-300 rounded-md">
      <div className="absolute top-4 left-4">
        <p className="text-xl font-bold">
          <span className="text-sm font-semibold text-textColor">
            {t('count')} :{" "}
          </span>
          {filteredSongs ? filteredSongs?.length : allSongs?.length}
        </p>
      </div>

      <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
    </div>
  )
}

export const SongContainer = ({ data }) => {
  return (
    <div className="flex flex-col flex-1">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} />
        ))}
    </div>
  )
}

export const SongCard = ({ data, index }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState(null)

  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue()

  const addSongToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };

  const deleteObject = (id) => {
    console.log(id)
    deleteSongById(id).then((res) => {
      // console.log(res.data)
      if (res.data.success) {
        setAlert("success")
        setAlertMsg(res.data.msg)
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false)
        }, 4000);
      } else {
        setAlert("error")
        setAlertMsg(res.data.msg)
        setTimeout(() => {
          setAlert(false)
        }, 4000)
      }
    })
  }
  const handleDeleted = () => {
    setIsDeleted(true)
    console.log("click")
  }
  const { t } = useTranslation()
  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="xl:w-[800px] lg:w-[500px] md:[160px] px-2 py-4 h-36 cursor-pointer hover:shadow-xl bg-card hover:bg-gray-100 shadow-md rounded-lg flex items-center gap-x-2 gap-y-4"

    >
      {isDeleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="absolute z-10 p-2 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center mx-auto"
        >
          <div className="text-sm text-center text-textColor font-semibold">
            {t('AUSdel')}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
              onClick={() => deleteObject(data._id)}
            >
              {t('yes')}
            </button>
            <button
              className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
              onClick={() => setIsDeleted(false)}
            >
              {t('no')}
            </button>
          </div>
        </motion.div>
      )}

      <div className="w-40 h-full rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt=""
          className=" w-full h-full rounded-lg object-cover"
          onClick={addSongToContext}
        />
      </div>

      <p className="text-base text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
        <span className="block text-sm text-gray-400 my-1">{data.artist}</span>
      </p>

      <div className="ml-auto p-2">
        <motion.i onClick={handleDeleted}>
          <BtnDelete />
        </motion.i>
      </div>

      {alert && (
        <>
          {alert === "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default DashboardSongs;
