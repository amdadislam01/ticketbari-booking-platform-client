import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import useRole from "../../../hooks/useRole";
import {
  FaEnvelope,
  FaIdBadge,
  FaCalendarCheck,
  FaBan,
  FaShieldAlt,
} from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router";

const Profile = () => {
  const { user, loading: authLoading } = UseAuth();
  const { role } = useRole();
  const { isDarkMode } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: bookingData = {} } = useQuery({
    queryKey: ["bookingData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const totalSpent = payments.reduce((acc, p) => acc + p.amount, 0);

  if (authLoading || isLoading) {
    return <Loading />;
  }

  const photo = userData?.photoURL || user?.photoURL;
  const joinDate = userData?.createdAt
    ? new Date(userData.createdAt)
    : new Date();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Manage your account & track your journey with TicketBari
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/*  Profile Card */}
          <div className="lg:col-span-4">
            <div
              className={`rounded-3xl shadow-2xl overflow-hidden border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="h-32 bg-linear-to-r from-orange-600 via-yellow-500 to-amber-600"></div>

              <div className="relative px-8 pb-10 -mt-16">
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={photo}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover ring-4 ring-yellow-400 ring-opacity-50"
                    />
                    {role === "admin" && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white p-2 rounded-full shadow-lg">
                        <FaShieldAlt size={16} />
                      </div>
                    )}
                    {role === "fraud" && (
                      <div className="absolute -top-1 -right-1 bg-red-600 text-white p-2 rounded-full shadow-lg animate-pulse">
                        <FaBan size={16} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center mt-6">
                  <h2
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {userData?.displayName || user?.displayName || "Traveler"}
                  </h2>
                  <p className="text-gray-500">
                    @{userData?.username || user?.email?.split("@")[0]}
                  </p>

                  {/* Role Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border">
                    <FaIdBadge
                      className={`${
                        role === "admin"
                          ? "text-green-500"
                          : role === "vendor"
                          ? "text-blue-500"
                          : role === "fraud"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    />
                    <span
                      className={`capitalize ${
                        role === "admin"
                          ? "text-green-500"
                          : role === "vendor"
                          ? "text-blue-500"
                          : role === "fraud"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {role === "fraud"
                        ? "Restricted User"
                        : role || "Passenger"}
                    </span>
                  </div>
                </div>

                {/* Info List */}
                <div className="mt-8 space-y-5 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                      <FaEnvelope className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium break-all">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                      <FaCalendarCheck className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {joinDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  Stats & Actions */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Grid */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-3xl shadow-xl border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              {[
                {
                  label: "Total Bookings",
                  value: bookingData?.length || 0,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  label: "Total Spent",
                  value: formatCurrency(totalSpent),
                  color: "from-green-500 to-emerald-500",
                },
                {
                  label: "Active Tickets",
                  value: userData?.length || 10,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  label: "Trips Completed",
                  value: userData?.completedTrips || 10,
                  color: "from-orange-500 to-red-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center group flex flex-col items-center"
                >
                  <div
                    className={`w-28 sm:w-32 md:w-40 h-24 sm:h-28 md:h-30 mb-3 rounded-2xl bg-gradient-to-br ${stat.color} p-1`}
                  >
                    <div
                      className="
          h-full w-full bg-white dark:bg-gray-900 rounded-2xl 
          flex items-center justify-center 
          text-center font-bold text-gray-800 dark:text-white
          text-lg sm:text-xl md:text-2xl 
          px-2 truncate
        "
                    >
                      {stat.value}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Fraud Alert */}
            {role === "fraud" && (
              <div className="p-6 bg-linear-to-r from-red-900 to-red-800 rounded-2xl border border-red-700 shadow-2xl text-white text-center">
                <FaBan className="text-4xl mx-auto mb-3 opacity-80" />
                <h3 className="text-2xl font-bold">Account Restricted</h3>
                <p className="mt-2 opacity-90">
                  Your account has been flagged for suspicious activity. Ticket
                  management features are disabled.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div
              className={`p-8 rounded-3xl shadow-xl border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-orange-500">
                Account Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Link
                  to={"/my-profile"}
                  className="group relative overflow-hidden px-8 py-5 bg-linear-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="relative z-10">Edit Profile</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition"></div>
                </Link>

                <button className="group relative overflow-hidden px-8 py-5 bg-linear-to-r from-gray-700 to-gray-900 dark:from-gray-800 dark:to-black text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <span className="relative z-10">Security Settings</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
