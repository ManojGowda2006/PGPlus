import { useState } from "react";

export default function OwnerComplaintManagement() {
  const [complaints, setComplaints] = useState([
    { id: 1, tenant: "John Doe", issue: "Leaky tap", status: "Pending" },
    { id: 2, tenant: "Jane Smith", issue: "Wi-Fi not working", status: "Resolved" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Complaints</h1>
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Tenant</th>
              <th className="p-2 text-left">Issue</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.tenant}</td>
                <td className="p-2">{c.issue}</td>
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
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                      Update
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
