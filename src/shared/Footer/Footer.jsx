import React from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import {
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaCcStripe,
  FaBus,
} from "react-icons/fa";
import { Link } from "react-router";
const Footer = () => {
  const { isDarkMode } = useTheme();
  return (
    <footer
      className={`w-full border-t border-gray-200 pt-10 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-gray-300 border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-orange-500">
            <FaBus className="text-yellow-500" /> TicketBari
          </h2>
          <p className="mt-3 text-sm leading-6">
            Book bus, train, launch & flight tickets easily from one simple and
            reliable platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-500">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tickets">All Tickets</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-500">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@ticketbari.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook /> facebook.com/ticketbari
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-500">
            Payment Methods
          </h3>
          <div className="flex items-center gap-4 text-4xl">
            <FaCcStripe className="text-blue-500" /> 
          </div>
        </div>
      </div>

      <div
        className={`mt-10 py-4 text-center text-sm border-t transition-colors duration-300 ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
