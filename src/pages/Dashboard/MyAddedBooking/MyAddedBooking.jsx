import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import UseAuth from "../../../hooks/UseAuth";
import {
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaLocationArrow,
} from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const Countdown = ({ date }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const target = new Date(date);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Expired");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
      {countdown}
    </span>
  );
};


const MyAddedBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const { user } = UseAuth();

  //  Bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["booking-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading />
  }

  return (
    <div
      className={`p-6 min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-10 text-center tracking-wide">
        My Booked Tickets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((ticket) => {
          const departurePassed = new Date(ticket.ticketDate) - new Date() <= 0;
          const status = ticket.status;

          return (
            <div
              key={ticket._id}
              className={`rounded-2xl shadow-xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-gray-800/60 backdrop-blur-xl border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Image */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 space-y-4">
                {/* Title */}
                <h2 className="flex justify-between items-center text-xl font-bold">
                  {ticket.title} 
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold shadow ${
                      status === "pending" && "bg-yellow-500/20 text-yellow-400"
                    }
              ${status === "accepted" && "bg-blue-500/20 text-blue-400"}
              ${status === "rejected" && "bg-red-500/20 text-red-400"}
              ${status === "paid" && "bg-green-500/20 text-green-400"}
            `}
                  >
                    {status === "pending" && <FaClock />}
                    {status === "accepted" && <FaCheckCircle />}
                    {status === "paid" && <FaMoneyBillWave />}
                    {status === "rejected" && <FaTimesCircle />}
                    Status: {status}
                  </span>
                </h2>

                {/* Info */}
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-3">
                    <p>
                      Booked Quantity:
                      <span className="font-semibold"> {ticket.quantity}</span>
                    </p>
                    •
                    <p>
                      Total Price:
                      <span className="font-semibold">
                        {" "}
                        {ticket.totalPrice} Tk
                      </span>
                    </p>
                  </div>

                  <p className="flex items-center gap-2">
                    <FaLocationArrow /> {ticket.from}
                    <span className="font-bold">→</span> {ticket.to}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaClock />
                    Departure:{" "}
                    {new Date(ticket.ticketDate).toLocaleDateString()} •{" "}
                    {ticket.time}
                  </p>
                </div>

                {/* Countdown  */}
                {status !== "rejected" && (
                  <div
                    className={`mt-2 p-3 rounded-xl border flex items-center gap-3 text-sm font-medium ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800/40"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <FaHourglassHalf className="text-blue-500 text-lg" />
                    <span className="font-semibold">Countdown:</span>
                    <div className="text-blue-500 font-bold">
                      <Countdown date={ticket.ticketDate} />
                    </div>
                  </div>
                )}

                {/* Buttons Functionality */}
                {/* Pending */}
                {status === "pending" && (
                  <button
                    disabled
                    className="w-full mt-3 py-2 rounded-lg font-semibold bg-yellow-400 text-gray-800 cursor-not-allowed"
                  >
                    Awaiting Approval
                  </button>
                )}

                {/* Accepted */}
                {status === "accepted" && !departurePassed && (
                  <button
                    className="w-full mt-3 py-2 rounded-lg font-semibold text-white bg-linear-to-r from-blue-500 to-blue-700 hover:opacity-90 transition"
                    onClick={() => alert("Stripe payment here")}
                  >
                    Pay Now
                  </button>
                )}

                {/* Paid */}
                {status === "paid" && (
                  <button
                    disabled
                    className="w-full mt-3 py-2 rounded-lg font-semibold bg-green-500 text-white cursor-not-allowed"
                  >
                    Payment Complete
                  </button>
                )}

                {/* Time passed */}
                {status === "accepted" && departurePassed && (
                  <p className="text-red-500 font-medium text-sm mt-2">
                    Departure time passed. Payment disabled.
                  </p>
                )}

                {/* Rejected */}
                {status === "rejected" && (
                  <p className="text-red-400 text-sm mt-2 font-medium">
                    This booking was rejected.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAddedBooking;
