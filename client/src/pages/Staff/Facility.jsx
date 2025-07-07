import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default function UpdateFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_URL}/facilities`, {
          withCredentials: true,
        });
        setFacilities(res.data);
      } catch (err) {
        console.error("Failed to fetch facilities:", err);
      }
    };
    fetch();
  }, []);

  const handleUpdate = async (id, newStatus) => {
    try {
      await axios.patch(
        `${API_URL}/facilities/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setFacilities((prev) =>
        prev.map((f) => (f._id === id ? { ...f, status: newStatus } : f))
      );
    } catch (err) {
      console.error("Failed to update facility:", err);
    }
  };

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Facility Status</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse table-fixed">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="w-1/3 p-3 border-b">Facility</th>
                <th className="w-1/4 p-3 border-b">Type</th>
                <th className="w-1/4 p-3 border-b text-center">Status</th>
                <th className="w-1/4 p-3 border-b text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilities.map((facility, idx) => (
                <tr
                  key={facility._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 border-b">{facility.name}</td>
                  <td className="p-3 border-b">{facility.type}</td>
                  <td
                    className={`p-3 border-b text-center font-semibold ${getStatusColor(
                      facility.status
                    )}`}
                  >
                    {facility.status}
                  </td>
                  <td className="p-3 border-b text-center">
                    <select
                      value={facility.status}
                      onChange={(e) =>
                        handleUpdate(facility._id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="Working">Working</option>
                      <option value="Needs Repair">Needs Repair</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredFacilities.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No facilities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Working":
      return "text-green-600";
    case "Needs Repair":
      return "text-yellow-500";
    default:
      return "text-gray-600";
  }
}
