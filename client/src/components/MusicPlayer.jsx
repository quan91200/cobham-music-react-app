/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import { motion, useAnimation } from "framer-motion";

import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

import { IoMdClose } from "react-icons/io";
import { RiPlayListFill } from "react-icons/ri";
import { GiArrowDunk } from "react-icons/gi";

import "react-h5-audio-player/lib/styles.css";
import '../index.css'

const MusicPlayer = ({ togglePanel }) => {
  const [{ allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  useEffect(() => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song]);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        loop: Infinity,
        duration: 10,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4 ${miniPlayer ? "absolute top-40" : "flex relative"
          }`}
      >
        <img
          src={allSongs[song]?.imageURL}
          className="w-40 h-20 object-cover rounded-md"
          alt=""
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold moving-text">
            <span>
              {`${allSongs[song]?.name.length > 35
                ? allSongs[song]?.name.slice(0, 20)
                : allSongs[song]?.name
                }`}
            </span>{" "}
          </p>
          <p className="text-textColor">
            {allSongs[song]?.artist}{" "}
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={togglePanel}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[song]?.songUrl}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer mb-1" />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <GiArrowDunk className="text-textColor hover:text-headingColor text-xl cursor-pointer" />
          </motion.i>
        </div>
      </div>

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 z-50"
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center  relative">
            <div className="absolute inset-0 rounded-full gradient blur-md scale-box" />
            <img
              onClick={togglePlayer}
              src={allSongs[song]?.imageURL}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer spin-disc"
              alt=""
              animate={controls}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};



export default MusicPlayer;
