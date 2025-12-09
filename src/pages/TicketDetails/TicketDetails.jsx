import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import UseAuth from "../../hooks/UseAuth";

// Icons
import { FaBus, FaClock, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { MdOutlineAttachMoney, MdDateRange } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const { user } = UseAuth();

  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");
  const [ticketData, setTicketData] = useState(null);

  const {
    data: ticket,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/added-ticket/approved/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (ticket) setTicketData(ticket);
  }, [ticket]);

  useEffect(() => {
    if (!ticketData?.date) return;

    const interval = setInterval(() => {
      const now = new Date();
      const departure = new Date(ticketData.date);
      const diff = departure - now;

      if (diff <= 0) {
        setCountdown("Expired");
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticketData]);

  if (isLoading) return <Loading />;

  if (error || !ticketData)
    return (
      <div className="text-center py-32 text-red-500 text-2xl">
        Ticket Not Found
      </div>
    );

  const isExpired = new Date(ticketData.date) < new Date();
  const soldOut = ticketData.quantity <= 0;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (quantity > ticketData.quantity)
      return toast.warning("Not enough tickets!");

    try {
      await axiosSecure.post("/booking", {
        userEmail: user?.email,
        ticketId: ticketData._id,
        title: ticketData.title,
        image: ticketData.image,
        from: ticketData.from,
        to: ticketData.to,
        transport: ticketData.transport,
        quantity,
        ticketDate: ticketData.date,
        time: ticketData.time,
        totalPrice: ticketData.price * quantity,
        status: "pending",
        bookingTime: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Booking Successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTicketData((prev) => ({
        ...prev,
        quantity: prev.quantity - quantity,
      }));

      setOpenModal(false);
      setQuantity(1);
    } catch (err) {
      toast.warn("Booking Failed!");
    }
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg ${
          isDarkMode ? "bg-gray-800/80" : "bg-white/90"
        }`}
      >
        <img
          src={ticketData.image}
          alt={ticketData.title}
          className="w-full h-96 object-cover brightness-90"
        />

        <div className="p-8 space-y-4">
          <h1 className="text-4xl font-extrabold mb-4">{ticketData.title}</h1>

          <div className="flex items-center gap-3 text-xl">
            <FaMapMarkerAlt className="text-orange-500" />
            <span>
              {ticketData.from} → {ticketData.to}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xl">
            <FaBus className="text-blue-500" />
            <span>
              Transport: <strong>{ticketData.transport}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-2xl text-green-500 font-bold">
            <MdOutlineAttachMoney />
            <span>${ticketData.price} per ticket</span>
          </div>

          <div className="flex items-center gap-3 text-xl">
            <FaTicketAlt className="text-yellow-400" />
            <span>
              Available:{" "}
              <strong className="text-orange-400">{ticketData.quantity}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xl">
            <MdDateRange className="text-blue-400" />
            <span>
              Departure: {new Date(ticketData.date).toLocaleDateString()} •{" "}
              {ticketData.time}
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="mt-10">
            <div className="flex items-center justify-center gap-4">
              <FaClock className="text-yellow-400 text-5xl drop-shadow-md" />
              <div
                className="bg-linear-to-r from-yellow-500 via-orange-500 to-red-500 
                px-6 py-3 rounded-xl shadow-xl text-white font-extrabold text-3xl 
                tracking-wider  border border-white/20"
              >
                {countdown === "Expired" ? (
                  <span className="text-red-300">Expired</span>
                ) : (
                  countdown
                )}
              </div>
            </div>
            <div className="w-full flex justify-center mt-3">
              <div className="h-2 w-48 bg-linear-to-r from-yellow-500/40 to-orange-500/40 rounded-full blur-md"></div>
            </div>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            disabled={isExpired || soldOut}
            className={`mt-8 w-full py-4 text-xl font-bold rounded-lg text-white transition ${
              isExpired || soldOut
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 shadow-lg"
            }`}
          >
            {isExpired ? "Expired" : soldOut ? "Sold Out" : "Book Now"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            className={`p-8 rounded-2xl w-96 shadow-xl ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Confirm Booking</h2>

            <input
              type="number"
              min="1"
              max={ticketData.quantity}
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className={`w-full p-3 border rounded-lg mb-6 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
              placeholder="Enter quantity"
            />

            <p className="text-xl font-bold mb-6">
              Total: ${ticketData.price * quantity}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setOpenModal(false)}
                className={`px-6 py-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-600 text-white hover:bg-gray-500"
                    : "bg-gray-500 text-white hover:bg-gray-400"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className={`px-6 py-3 rounded-lg ${
                  isDarkMode
                    ? "bg-orange-600 text-white hover:bg-orange-500"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
