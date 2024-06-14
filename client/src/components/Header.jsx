/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

import { Logo } from "../assets/img"

import { useStateValue } from "../Context/StateProvider"
import { isActiveStyles, isNotActiveStyles } from "../utils/styles"

import { motion } from "framer-motion"

import { CgProfile } from "react-icons/cg"
import { MdDashboard } from "react-icons/md"

import { BtnLogout, FilterHeader } from '../components'

import LangSelector from "./LangSelector"
import { useTranslation } from "react-i18next"

const Header = () => {
  const [{ user }] = useStateValue()

  const { t } = useTranslation()

  const [isMenu, setIsMenu] = useState(false)
  const location = useLocation();

  return (
    <motion.div
      className="flex-col flex-1 w-full p-6 md:py-2 md:px-6 h-fit bg-gradient-to-b from-red-400 sticky top-0 z-30"
    >
      <motion.div className="flex items-center w-full">
        <NavLink to={"/"}>
          <img src={Logo} className="w-10" alt="" />
        </NavLink>
        <motion.ul className="flex items-start ml-7">
          <motion.li className="mx-5 text-lg hover:font-semibold">
            <NavLink
              to={'/'}
              className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
            >
              {t("home")}
            </NavLink>
          </motion.li>
          <motion.li className="mx-5 text-lg hover:font-semibold">
            <NavLink
              to={'/discovery'}
              className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
            >
              {t('discovery')}
            </NavLink>
          </motion.li>
          <motion.li className="mx-5 text-lg hover:font-semibold">
            <NavLink
              to={'/contact'}
              className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
            >
              {t('contact')}
            </NavLink>
          </motion.li>
        </motion.ul>
        <div
          className="flex items-center ml-auto cursor-pointer gap-2 relative"
        >
          <LangSelector />
          <img
            className="w-12 h-12 object-cover rounded-full shadow-lg"
            src={user?.user?.imageURL}
            alt=""
            referrerpolicy="no-referrer"
            onMouseEnter={() => setIsMenu(true)}

          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onMouseLeave={() => setIsMenu(false)}
              className="absolute z-50 top-12 right-0 w-[200px] p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
            >
              <NavLink to={"/profile"}>
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-x-2">
                  <CgProfile /> {t('profile')}
                </p>
              </NavLink>
              <hr />
              {user?.user.role === "admin" && (
                <>
                  <NavLink to={"/dashboard/home"}>
                    <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-x-2">
                      <MdDashboard />{t('dashboard')}
                    </p>
                  </NavLink>
                  <hr />
                </>
              )}
              <BtnLogout />
            </motion.div>
          )}
        </div>
      </motion.div>
      {location.pathname === '/' && <FilterHeader />}
    </motion.div>
  )
}
export default Header
