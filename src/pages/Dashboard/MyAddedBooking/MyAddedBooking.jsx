import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import UseAuth from "../../../hooks/UseAuth";
import {
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTicketAlt,
} from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";
import { motion } from "framer-motion";

// Reusable Countdown
const Countdown = ({ date }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const target = new Date(date).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Expired");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (countdown === "Expired") return <span className="text-red-500 font-bold">Expired</span>;

  return (
    <span className="px-4 py-2 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-bold text-sm shadow-lg">
      {countdown}
    </span>
  );
};

const MyAddedBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const { user } = UseAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


const handlePayment = async (booking) => {
  try {
    const paymentInfo = {
      totalPrice: booking.totalPrice,
      ticketId: booking._id,
      title: booking.title,
      senderEmail: booking.userEmail,
    };

    console.log("PAYMENT INFO SENT:", paymentInfo);

    const res = await axiosSecure.post("/checkout-payment", paymentInfo);
    window.location.href = res.data.url;
  } catch (error) {
    console.error("Payment failed:", error);
    alert("Payment failed: " + error?.response?.data?.message || error.message);
  }
};




  if (isLoading) return <Loading />;

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-linear-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent"
        >
          My Booked Tickets
        </motion.h1>

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No bookings found. Start your journey today!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking, index) => {
              const isExpired = new Date(booking.ticketDate) < new Date();
              const status = booking.status;

              const statusStyles = {
                pending: "from-yellow-500 to-orange-600",
                approved: "from-blue-500 to-purple-600",
                paid: "from-green-500 to-emerald-600",
                rejected: "from-red-500 to-rose-600",
              };

              const gradient = statusStyles[status] || statusStyles.pending;

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl border ${
                    isDarkMode
                      ? "bg-gray-800/90 border-gray-700"
                      : "bg-white/95 border-gray-200"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg bg-linear-to-r ${gradient}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    <h3 className="text-xl font-bold line-clamp-2">{booking.title}</h3>

                    {/* Route */}
                    <div className="flex items-center gap-3 text-lg">
                      <FaMapMarkerAlt className="text-orange-500" />
                      <span>
                        {booking.from} → {booking.to}
                      </span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-3 text-sm opacity-90">
                      <FaCalendarAlt className="text-purple-500" />
                      <span>
                        {new Date(booking.ticketDate).toLocaleDateString("en-GB")} • {booking.time}
                      </span>
                    </div>

                    {/* Tickets & Price */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-600/30 dark:border-gray-300/20">
                      <div className="flex items-center gap-2">
                        <FaTicketAlt className="text-yellow-500" />
                        <span className="font-medium">{booking.quantity} Ticket{booking.quantity > 1 ? "s" : ""}</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-500">
                        {booking.totalPrice} Tk
                      </div>
                    </div>

                    {/* Countdown or Status Message */}
                    {status !== "rejected" && !isExpired && status !== "paid" && (
                      <div className="flex items-center justify-center gap-3 py-3 bg-orange-500/10 dark:bg-orange-900/30 rounded-xl border border-orange-500/30">
                        <FaHourglassHalf className="text-orange-500 animate-pulse" /> Time Left:
                        <Countdown date={booking.ticketDate} />
                      </div>
                    )}

                    {/* Action Button / Status */}
                    <div className="pt-4">
                      {status === "pending" && (
                        <button disabled className="w-full py-4 rounded-xl font-bold text-yellow-600 bg-yellow-500/20 border border-yellow-500/40 cursor-not-allowed">
                          Awaiting Approval
                        </button>
                      )}

                      {status === "approved" && !isExpired && (
                        <button onClick={() => handlePayment(booking)} className="w-full py-4 rounded-xl font-bold text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform transition active:scale-95">
                          Pay Now
                        </button>
                      )}

                      {status === "paid" && (
                        <button disabled className="w-full py-4 rounded-xl font-bold text-white bg-linear-to-r from-green-500 to-emerald-600 opacity-90 cursor-not-allowed shadow-lg">
                          Payment Completed
                        </button>
                      )}

                      {(isExpired && status !== "paid") && (
                        <div className="text-center py-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-500 font-bold">
                          Trip Expired
                        </div>
                      )}

                      {status === "rejected" && (
                        <div className="text-center py-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-500 font-bold">
                          Booking Rejected
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedBooking;