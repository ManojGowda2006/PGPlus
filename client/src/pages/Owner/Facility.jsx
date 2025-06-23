import { useState } from "react";

const initialFacilities = [
  { id: 1, name: "Wi-Fi", condition: "Good" },
  { id: 2, name: "Water Supply", condition: "Needs Maintenance" },
  { id: 3, name: "Elevator", condition: "Good" },
  { id: 4, name: "Generator", condition: "Under Repair" },
];

export default function FacilityManagement() {
  const [facilities, setFacilities] = useState(initialFacilities);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Facility Management</h1>
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <h2 className="font-semibold mb-3">PG Facilities Status</h2>
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border-b">Facility</th>
              <th className="p-2 border-b">Condition</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr key={facility.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{facility.name}</td>
                <td className="p-2 border-b">
                  <span className={`px-2 py-1 rounded-full text-white text-xs ${getConditionBadge(facility.condition)}`}>
                    {facility.condition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getConditionBadge(condition) {
  switch (condition) {
    case "Good":
      return "bg-green-500";
    case "Needs Maintenance":
      return "bg-yellow-500";
    case "Under Repair":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
}
