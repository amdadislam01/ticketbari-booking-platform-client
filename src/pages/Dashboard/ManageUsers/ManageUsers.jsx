import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const [loadingId, setLoadingId] = useState(null);

  // Fetch all users using React Query
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });


  // Update User Role 
  const updateRole = async (id, role) => {
    try {
      setLoadingId(id);
      await axiosSecure.patch(`/users/${id}/role`, { role });
      await refetch();
    } catch (error) {
      console.error("Role update error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      className={`p-6 min-h-screen transition ${
        isDarkMode ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div
        className={`overflow-x-auto rounded-xl shadow-lg p-4 ${
          isDarkMode ? "bg-[#1e293b]" : "bg-white"
        }`}
      >
        <table className="min-w-full table-auto">
          <thead>
            <tr
              className={`text-left ${
                isDarkMode ? "bg-[#334155] text-gray-200" : "bg-gray-100 text-gray-700"
              }`}
            >
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-medium">{user.displayName || "No Name"}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-blue-600/20 text-blue-400"
                        : user.role === "vendor"
                        ? "bg-purple-600/20 text-purple-400"
                        : user.role === "fraud"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 flex gap-3 justify-center flex-wrap">
                  {/* Make Admin */}
                  <button
                    onClick={() => updateRole(user._id, "admin")}
                    disabled={loadingId === user._id || user.role === "admin"}
                    className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition disabled:opacity-40"
                  >
                    {loadingId === user._id ? "..." : "Make Admin"}
                  </button>

                  {/* Make Vendor */}
                  <button
                    onClick={() => updateRole(user._id, "vendor")}
                    disabled={loadingId === user._id || user.role === "vendor"}
                    className="px-3 py-1 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700 transition disabled:opacity-40"
                  >
                    {loadingId === user._id ? "..." : "Make Vendor"}
                  </button>

                  {/* Mark as Fraud (Only Vendors) */}
                  {user.role === "vendor" && (
                    <button
                      onClick={() => updateRole(user._id, "fraud")}
                      disabled={loadingId === user._id}
                      className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition disabled:opacity-40"
                    >
                      {loadingId === user._id ? "..." : "Mark as Fraud"}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
