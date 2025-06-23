import { useState } from "react";

export default function OwnerTenantManagement() {
  const [tenants, setTenants] = useState([
    { id: 1, name: "John Doe", room: "101" },
    { id: 2, name: "Jane Smith", room: "102" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tenants</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Room</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => (
              <tr key={tenant.id} className="border-b">
                <td className="p-2">{tenant.name}</td>
                <td className="p-2">{tenant.room}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add Tenant</button>
      </div>
    </div>
  );
}
