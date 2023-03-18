import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const AuthLayout = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  return (
    <div className={isDarkMode ? "dark h-full" : "light h-full"}>
      <div className="h-full dark:bg-zinc-900">
        <div className="flex dark:bg-light-gray bg-zinc-300 max-w-none h-8 items-center justify-between">
          <div className="flex justify-center gap-x-2 items-center h-full h-3/4 ml-2.5">
            <Link
              to="/"
              className="text-md text-white hover:text-slate-400 bg-zinc-400 dark:bg-zinc-800 px-1 rounded"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-md text-white hover:text-slate-400 bg-zinc-400 dark:bg-zinc-800 px-1 rounded"
            >
              About
            </Link>
          </div>
          <button
            className="px-1.5 py-0 mr-1 dark:bg-zinc-800 dark:text-white"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="text-sm"
            />
          </button>
        </div>
        <h1 className="text-3xl font-bold text-center dark:text-white mt-3">Wenda IMPROVED</h1>
        <div className="flex dark:text-white mx-5 my-2 h-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
