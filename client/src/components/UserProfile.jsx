/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "./Header";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5"
import { useTranslation } from "react-i18next"
import BtnPremium from "./BtnPremium";

const UserProfile = () => {

  const { t } = useTranslation()
  const [{ user }, dispatch] = useStateValue()

  const [color, setColor] = useState("")
  const colorPalette = ["#ff4700", "#11a9ff", "#18242d", "#61f8b9", "#618cb9", "#e78cb9"];

  const handleColorChange = (color) => {
    setColor(color);
  };

  const [isMenu, setIsMenu] = useState(false)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="bg-gray-50/100 h-full px-2 w-full">
        <div className="w-full mx-auto flex flex-col px-20">
          <div
            style={{ backgroundColor: color }}
            onClick={() => setIsMenu(true)}
            className="
              relative flex flex-row items-center w-full justify-start px-5 shadow-2xl rounded-md cursor-pointer bg-[#ff4700]
              "
          >
            <span className="py-5 flex items-center">
              <img
                className="w-48 h-48 object-cover rounded-full shadow-2xl"
                src={user?.user?.imageURL}
                alt=""
                referrerpolicy="no-referrer"
              />
              <div className="pl-5 flex flex-1 flex-col text-white gap-y-2">
                <div>
                  <p>{t('profile')}</p>
                  <p className="text-xl font-semibold flex items-center gap-x-2">
                    {user?.user?.name}
                    {user?.user.role === "admin" && (
                      <BtnPremium />
                    )}
                  </p>
                </div>
              </div>
            </span>
          </div>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="
                absolute inset-y-0 z-10 right-0 w-auto py-5 px-3 gap-5 bg-card shadow-lg rounded-xl backdrop-blur-sm flex flex-col"
            >
              {colorPalette.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="py-2 px-4 border-none cursor-pointer text-base text-white hover:font-semibold duration-150 transition-all ease-in-out rounded-2xl"
                  style={{
                    backgroundColor: color,
                  }}>
                  {color}
                </button>
              ))}
              <div
                className="flex items-center justify-center mt-auto cursor-pointer text-2xl"
                onClick={() => setIsMenu(false)}>
                <IoCloseCircleOutline />
              </div>
            </motion.div>
          )}
        </div>
        <div className="border-t-2 border-spacing-1 border-t-primary mt-3">
          <h3 className="flex items-center justify-center text-xl my-2">{t('social')}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfile

