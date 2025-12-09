import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { Link } from "react-router";
import Loading from "../../components/Loading/Loading";
import {
  FaMapMarkerAlt,
  FaBus,
  FaDollarSign,
  FaGift,
  FaCalendarAlt,
  FaLayerGroup,
} from "react-icons/fa";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/added-ticket/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`p-6 min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-extrabold text-orange-500 mb-10 text-center tracking-wide">
        All Tickets
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className={`rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Image */}
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-5 space-y-3">
              <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>

              <p className="flex items-center gap-2 text-gray-500 dark:text-gray-300 text-sm">
                <FaMapMarkerAlt className="text-yellow-500" />
                {ticket.from} → {ticket.to}
              </p>

              <p className="flex items-center gap-2 font-medium text-yellow-600 dark:text-yellow-400">
                <FaBus />
                Transport: {ticket.transport}
              </p>

              <p className="flex items-center gap-2 font-semibold text-orange-500 dark:text-orange-400">
                <FaDollarSign />
                Price: ${ticket.price} / unit
              </p>

              <p className="flex items-center gap-2 text-sm font-medium">
                <FaLayerGroup className="text-green-500" />
                Quantity:{" "}
                <span className="font-semibold">{ticket.quantity}</span>
              </p>

              {ticket.perks?.length > 0 && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                  <FaGift className="text-pink-500" />
                  Perks: {ticket.perks.join(", ")}
                </p>
              )}

              <p className="flex items-center gap-2 text-sm font-medium">
                <FaCalendarAlt className="text-blue-500" />
                Departure: {new Date(ticket.date).toLocaleDateString()} • {ticket.time}
              </p>

              <Link
                to={`/all-tickets/${ticket._id}`}
                className="inline-block w-full text-center mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <p className="col-span-full text-center text-gray-400 text-lg mt-10">
            No approved tickets available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
