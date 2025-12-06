import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = UseAuth();
  const { role } = useRole();
  const { isDarkMode } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <img
          src={userData?.photoURL}
          alt="avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h3 className="text-xl font-bold text-center">{userData?.displayName}</h3>
        <p className="text-center">{userData?.email}</p>
        <p className="text-center mt-2">Role: {role}</p>
      </div>

      <div
        className={`p-6 rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className="text-lg font-bold mb-4">Account Information</h3>
        <ul className="space-y-2">
          <li>Total Bookings: 5</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
