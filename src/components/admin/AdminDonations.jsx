import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/donations`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch donations", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold text-center text-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6">
        Donations Dashboard
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Method</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((d, i) => (
                <tr
                  key={i}
                  className={`transition-all duration-200 border-b border-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:via-gray-700 hover:to-gray-800`}
                >
                  <td className="py-2 px-4 font-semibold text-blue-400">${d.amount}</td>
                  <td className="py-2 px-4 capitalize text-gray-200">{d.method}</td>
                  <td className="py-2 px-4 text-gray-400">{d.message || "—"}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      d.status.toLowerCase() === "completed"
                        ? "text-green-400"
                        : d.status.toLowerCase() === "pending"
                        ? "text-yellow-400"
                        : "text-red-500"
                    }`}
                  >
                    {d.status}
                  </td>
                  <td className="py-2 px-4 text-gray-300">
                    {new Date(d.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No donations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDonations;
