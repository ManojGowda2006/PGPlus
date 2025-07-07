import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function FacilityManagement() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      const res = await axios.get(`${API_URL}/facilities`, {
        withCredentials: true,
      });
      setFacilities(res.data);
    };
    fetchFacilities();
  }, []);

  const groupedFacilities = facilities.reduce((acc, facility) => {
    if (!acc[facility.type]) {
      acc[facility.type] = [];
    }
    acc[facility.type].push(facility);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Facility Management</h1>

      {Object.entries(groupedFacilities).map(([type, items]) => (
        <div key={type} className="mb-10 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black-700 border-b pb-2">{type} Facilities</h2>
          <div className="overflow-x-auto">
            <table className="table-fixed min-w-full text-sm text-left border-collapse">
              <thead className="bg-indigo-50 text-indigo-800 uppercase text-xs tracking-wide">
                <tr>
                  <th className="w-2/3 p-3 border-b">Facility</th>
                  <th className="w-1/3 p-3 border-b text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((facility, idx) => (
                  <tr
                    key={facility._id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 border-b text-gray-800">{facility.name}</td>
                    <td className="p-3 border-b text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusBadge(
                          facility.status
                        )}`}
                      >
                        {facility.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function getStatusBadge(status) {
  switch (status) {
    case "Working":
      return "bg-green-500";
    case "Needs Repair":
      return "bg-yellow-500";
    default:
      return "bg-gray-400";
  }
}

