import { useState } from "react";

export default function AddRoomForm({ tenants, onCancel, onSubmit }) {
  const [type, setType] = useState("");
  const [tenant1, setTenant1] = useState("");
  const [tenant2, setTenant2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      doorNumber: e.target.doorNumber.value,
      type,
      status: e.target.status.value,
      tenants: type === "Single" ? [tenant1] : [tenant1, tenant2]
    };
    console.log(roomData);
    onSubmit(roomData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Room</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              type="text"
              name="doorNumber"
              required
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter room number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
            </select>
          </div>

         <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
                name="status"
                required
                className="w-full p-2 border rounded"
            >
                <option value="">Select status</option>
                <option value="occupied">Occupied</option>
                <option value="vacant">Vacant</option>
            </select>
        </div>


          {type && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tenant 1</label>
              <select
                value={tenant1}
                onChange={(e) => setTenant1(e.target.value)}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select tenant</option>
                {tenants.map((tenant) => (
                  <option key={tenant._id} value={tenant._id}>
                    {tenant.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {type === "Double" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tenant 2</label>
              <select
                value={tenant2}
                onChange={(e) => setTenant2(e.target.value)}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select tenant</option>
                {tenants.map((tenant) => (
                  <option key={tenant._id} value={tenant._id}>
                    {tenant.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
