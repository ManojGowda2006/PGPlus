import { useState, useEffect } from "react";

export default function EditRoomForm({ room, tenants, onCancel, onSubmit }) {
  const [tenant1, setTenant1] = useState("");
  const [tenant2, setTenant2] = useState("");

  useEffect(() => {
    if (room?.tenants?.length > 0) {
      setTenant1(room.tenants[0]?._id || "");
      setTenant2(room.type === "Double" ? room.tenants[1]?._id || "" : "");
    }
  }, [room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      roomId: room._id,
      tenants:
        room.type === "Single" ? [tenant1] : [tenant1, tenant2].filter(Boolean),
    };
    onSubmit(roomData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Room Tenants</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {room.type === "Double" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tenant 2</label>
              <select
                value={tenant2}
                onChange={(e) => setTenant2(e.target.value)}
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
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
