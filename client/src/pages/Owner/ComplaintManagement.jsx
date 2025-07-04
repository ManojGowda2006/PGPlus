import { useEffect, useState } from "react";
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function OwnerComplaintManagement() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_URL}/complaints`, {
          withCredentials: true
        });
        setComplaints(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, []);

    const updateStatus = async (id, currentStatus) => {
      const statusCycle = ["Pending", "In Progress", "Resolved"];
      const nextStatus = statusCycle[(statusCycle.indexOf(currentStatus) + 1) % statusCycle.length];

      try {
        await axios.put(`${API_URL}/complaints/${id}`, {
          status: nextStatus
        }, {
          withCredentials: true
        });

        setComplaints(prev =>
          prev.map(c => c._id === id ? { ...c, status: nextStatus } : c)
        );
      } catch (err) {
        console.log(err.message);
      }
    };


  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/complaints/${id}`, {
        withCredentials: true
      });

      setComplaints(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Complaints</h1>
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Tenant</th>
              <th className="p-2 text-left">Issue</th>
              <th className="p-2 text-left">Details</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="p-2">{c.raisedBy?.fullName}</td>
                <td className="p-2">{c.title}</td>
                <td className="p-2">{c.description}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      c.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-2">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <button
                    onClick={() => updateStatus(c._id, c.status)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Update Status
                  </button>

                    <button
                      onClick={() => deleteComplaint(c._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
