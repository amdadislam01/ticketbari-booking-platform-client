import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaBars, FaTimes, FaBus } from "react-icons/fa";

const Navbar = ({ user }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Tickets", path: "/tickets" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 shadow-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaBus className="text-teal-500" />
          TicketBari
        </Link>

        {/*  Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${
                  isActive ? "bg-teal-500 text-white" : "hover:bg-teal-100 hover:text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-teal-500"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Users */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link className="px-4 py-2 bg-teal-600 text-white rounded-lg" to="/login">
                Login
              </Link>
              <Link
                className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg"
                to="/register"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileMenu(!profileMenu)} className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-teal-500"
                />
                <span>{user.name}</span>
              </button>

              {profileMenu && (
                <div
                  className={`absolute right-0 mt-2 w-44 rounded-md shadow-md p-2 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 rounded-md hover:bg-teal-500 hover:text-white"
                  >
                    Profile
                  </Link>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-red-500 hover:text-white">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu  */}
        <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 w-3/4 h-full shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white"}`}
      >
        <div className="p-5 flex flex-col gap-4">
          <button className="self-end text-2xl" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </button>

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg ${
                  isActive ? "bg-teal-500 text-white" : "hover:bg-teal-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg border border-teal-500 w-full"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {!user ? (
            <div className="flex flex-col gap-3">
              <Link className="px-4 py-2 bg-teal-600 text-white rounded-lg text-center" to="/login">
                Login
              </Link>
              <Link className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg text-center" to="/register">
                Register
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-teal-500 hover:text-white"
              >
                Profile
              </Link>
              <button className="px-4 py-2 rounded-lg bg-red-500 text-white">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
