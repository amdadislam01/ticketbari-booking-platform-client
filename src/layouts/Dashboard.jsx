import React, { useState } from "react";
import { FaUser, FaTicketAlt, FaHistory, FaBus } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { GrOverview } from "react-icons/gr";
import { LuTicketsPlane } from "react-icons/lu";
import { RiTicket2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { VscDiffAdded } from "react-icons/vsc";
import { useTheme } from "../context/ThemeContext/ThemeContext";
import { Link } from "react-router";
import AddedTickets from "../pages/Dashboard/AddedTickets/AddedTickets";
import useRole from "../hooks/useRole";
import Profile from "../pages/Dashboard/Profile/Profile";

const Dashboard = () => {
  const { role } = useRole();
  const { isDarkMode } = useTheme();
  const [active, setActive] = useState("profile");
  const [openMenu, setOpenMenu] = useState(false);

  // ------------------------------ ROLE BASED MENU ------------------------------
  const menuItems =
    role === "user"
      ? [
          { key: "profile", label: "Profile", icon: <FaUser /> },
          { key: "tickets", label: "My Booked Tickets", icon: <FaTicketAlt /> },
          {
            key: "transactions",
            label: "Transaction History",
            icon: <FaHistory />,
          },
        ]
      : role === "vendor"
      ? [
          { key: "profile", label: "Profile", icon: <FaUser /> },
          { key: "added-ticket", label: "Add Ticket", icon: <VscDiffAdded /> },
          {
            key: "my-tickets",
            label: "My Added Tickets",
            icon: <FaTicketAlt />,
          },
          {
            key: "request-booking",
            label: "Requested Bookings",
            icon: <CiSquareQuestion />,
          },
          {
            key: "revenue-overview",
            label: "Revenue Overview",
            icon: <GrOverview />,
          },
        ]
      : role === "admin"
      ? [
          { key: "profile", label: "Profile", icon: <FaUser /> },
          {
            key: "manage-tickets",
            label: "Manage Tickets",
            icon: <LuTicketsPlane />,
          },
          { key: "manage-users", label: "Manage Users", icon: <HiUsers /> },
          {
            key: "advertise-tickets",
            label: "Advertise Tickets",
            icon: <RiTicket2Fill />,
          },
        ]
      : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/*  MOBILE HEADER  */}
      <div
        className={`md:hidden flex justify-between items-center px-5 py-4 shadow sticky top-0 z-50 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FaBus className="text-yellow-500" />
          <span className="text-orange-500">TicketBari</span>
        </Link>

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-2xl text-yellow-500"
        >
          ☰
        </button>
      </div>

      {/*  MOBILE MENU  */}
      {openMenu && (
        <div
          className={`md:hidden flex flex-col px-5 pb-4 gap-3 border-b ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key);
                setOpenMenu(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                active === item.key
                  ? "bg-yellow-400 text-orange-600 font-semibold"
                  : "hover:bg-yellow-100 hover:text-orange-600"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}

      {/*  MAIN CONTENT AREA  */}
      <div
        className={`flex flex-1 transition-colors duration-500 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/*  SIDEBAR   */}
        <aside
          className={`hidden md:flex w-64 p-6 flex-col gap-6 border-r sticky top-0 h-screen ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <FaBus className="text-yellow-500" />
            <span className="text-orange-500">TicketBari</span>
          </Link>

          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                active === item.key
                  ? "bg-yellow-400 text-orange-600 font-semibold"
                  : "hover:bg-yellow-100 hover:text-orange-600"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </aside>

        {/*  PAGE CONTENT  */}
        <main className="flex-1 p-5 md:p-8">
          {/* PROFILE PAGE */}
          {active === "profile" && <Profile />}

          {/* VENDOR  */}
          {active === "added-ticket" && <AddedTickets />}

          {/* DEFAULT PAGE TEXT */}
          {active !== "profile" && active !== "added-ticket" && (
            <h1 className="text-xl font-bold">
              {active.replace("-", " ").toUpperCase()}
            </h1>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
