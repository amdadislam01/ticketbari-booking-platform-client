import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../../components/Loading/Loading";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const MyAddedTicket = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTickets", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/added-ticket?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // const { mutateAsync: deleteTicket } = useMutation({
  //   mutationFn: async (id) => {
  //     const { data } = await axiosSecure.delete(`/added-ticket/${id}`);
  //     return data;
  //   },
  //   onSuccess: () => {
  //     toast.success("Ticket deleted!");
  //     refetch();
  //   },
  // });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto p-6"
    >
      <h2
        className="
      text-4xl font-extrabold text-center 
      text-orange-700 dark:text-orange-400 
      tracking-wide mb-12 drop-shadow 
    "
      >
        My Added Tickets
      </h2>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          You haven't added any tickets yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="
            relative rounded-3xl 
            bg-white dark:bg-gray-800 
            border border-orange-100 dark:border-gray-700 
            shadow-xl dark:shadow-lg
            hover:shadow-3xl 
            transition-all duration-300 p-6
            bg-linear-to-br from-orange-50 to-white 
            dark:bg-linear-to-br dark:from-gray-900 dark:to-gray-800
          "
            >
              {/* IMAGE */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="
                w-full h-44 object-cover rounded-2xl
                transition-transform duration-500 group-hover:scale-110
              "
                />
              </div>

              {/* STATUS */}
              <span
                className={`absolute top-6 right-6 px-4 py-1 text-sm font-semibold rounded-full shadow-md
              ${
                ticket.status === "pending"
                  ? "bg-yellow-400 text-gray-900"
                  : ticket.status === "approved"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }
            `}
              >
                {ticket.status === "approved" && "✔ Approved"}
                {ticket.status === "pending" && "⏳ Pending"}
                {ticket.status === "rejected" && "❌ Rejected"}
              </span>

              {/* TITLE */}
              <h3 className="mt-5 text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
                {ticket.title}
              </h3>

              {/* INFO */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm">
                <p>
                  <strong>From:</strong> {ticket.from}
                </p>
                <p>
                  <strong>To:</strong> {ticket.to}
                </p>
                <p>
                  <strong>Transport:</strong> {ticket.transport}
                </p>
                <p>
                  <strong>Price:</strong> ${ticket.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {ticket.quantity}
                </p>

                <div className="flex items-center gap-2 col-span-2 mt-2">
                  <FaCalendarAlt className="text-orange-600 dark:text-orange-400" />
                  <span>{new Date(ticket.date).toLocaleDateString()}</span>

                  <FaClock className="text-orange-600 dark:text-orange-400 ml-4" />
                  <span>{ticket.time}</span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-7">
                <Link
                  to={`/dashboard/update-ticket/${ticket._id}`}
                  className={`
    px-5 py-2 rounded-xl font-semibold text-white
    transition-all duration-300 shadow-md hover:scale-[1.02]

    ${
      ticket.status === "rejected"
        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60 hover:scale-100"
        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    }
  `}
                >
                  Update
                </Link>

                <button
                  onClick={() => deleteTicket(ticket._id)}
                  disabled={ticket.status === "rejected"}
                  className={`
    px-5 py-2 rounded-xl font-semibold text-white
    transition-all duration-300 shadow-md hover:scale-[1.02]

    ${
      ticket.status === "rejected"
        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60 hover:scale-100"
        : "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
    }
  `}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyAddedTicket;
