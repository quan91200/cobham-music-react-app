import React from "react"
import { IoHome } from "react-icons/io5"
import { NavLink } from "react-router-dom"
import { Header, BackHome, RouteApp } from "."
import { isActiveStyles, isNotActiveStyles } from "../utils/styles"
import { useTranslation } from "react-i18next"

const Dashboard = () => {
  const { t } = useTranslation()
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <NavLink to={"/"}>
          <BackHome />
        </NavLink>
        <NavLink to={"/dashboard/home"}>
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
        >
          {t('users')}
        </NavLink>
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
        >
          {t('songs')}
        </NavLink>
        <NavLink
          to={"/dashboard/artist"}
          className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
        >
          {t('artists')}
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
        >
          Albums
        </NavLink>
        <NavLink
          to={"/dashboard/upload"}
          className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}
        >
          {t('upload')}
        </NavLink>
      </div>

      <div>
        <RouteApp />
      </div>
    </div>
  );
};

export default Dashboard;
