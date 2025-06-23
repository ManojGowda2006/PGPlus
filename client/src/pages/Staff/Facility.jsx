import { useState } from "react";

const initialFacilities = [
  { id: 1, name: "Wi-Fi", condition: "Good" },
  { id: 2, name: "Water Supply", condition: "Needs Maintenance" },
  { id: 3, name: "Elevator", condition: "Good" },
  { id: 4, name: "Generator", condition: "Under Repair" },
];

export default function UpdateFacilities() {
  const [facilities, setFacilities] = useState(initialFacilities);

  const handleUpdate = (id, newCondition) => {
    setFacilities(prev =>
      prev.map(f => (f.id === id ? { ...f, condition: newCondition } : f))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Facility Conditions</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b">Facility</th>
                <th className="p-2 border-b">Condition</th>
                <th className="p-2 border-b">Update</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map(facility => (
                <tr key={facility.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{facility.name}</td>
                  <td className={`p-2 border-b font-medium ${getConditionColor(facility.condition)}`}>
                    {facility.condition}
                  </td>
                  <td className="p-2 border-b">
                    <select
                      value={facility.condition}
                      onChange={(e) => handleUpdate(facility.id, e.target.value)}
                      className="border rounded p-1 text-sm"
                    >
                      <option>Good</option>
                      <option>Needs Maintenance</option>
                      <option>Under Repair</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getConditionColor(condition) {
  switch (condition) {
    case "Good":
      return "text-green-600";
    case "Needs Maintenance":
      return "text-yellow-500";
    case "Under Repair":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
}
