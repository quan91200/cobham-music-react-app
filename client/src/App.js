/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  getAuth,
} from "firebase/auth";
import { app } from "./config/firebase.config";
import { getAllSongs, validateUser } from "./api";
import {
  Panel,
  Loader,
  Login,
  MusicPlayer,
  Header,
  RouteApp
} from "./components";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user, allSongs, isSongPlaying }, dispatch] =
    useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          // console.log(token);
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const logout = () => {
    const firebaseAuth = getAuth();
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
        setIsPanelVisible(false);
        navigate("/login", { replace: true });
      })
      .catch((e) => console.log(e));
  };

  return (
    <AnimatePresence>
      {isLoading || (!user && (
        <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-md">
          <Loader />
          <Header logout={logout} />
        </div>
      ))}
      {isSongPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="
            fixed bottom-0 w-full items-center z-50
            bg-cardOverlay drop-shadow-xl backdrop-blur-md flex 
            "
        >
          <MusicPlayer togglePanel={togglePanel} />
        </motion.div>
      )}
      <div className="flex h-auto min-w-[680px]">
        <motion.div
          className={`${isPanelVisible ? "w-[85%]" : "w-full"
            }`}
          initial={{ width: isPanelVisible ? "80%" : "100%" }}
          animate={{ width: isPanelVisible ? "80%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <RouteApp />
          <Routes>
            <Route path="/login" element={<Login setAuth={setAuth} />} />
          </Routes>
        </motion.div>
        <Panel isPanelVisible={isPanelVisible} />
      </div>
    </AnimatePresence>

  );
}

export default App;
