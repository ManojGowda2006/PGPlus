import { useState } from "react";

export default function OwnerRoomManagement() {
  const [rooms, setRooms] = useState([
    { id: 1, number: "101", type: "Single", status: "Occupied" },
    { id: 2, number: "102", type: "Double", status: "Available" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Rooms</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Room Number</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id} className="border-b">
                <td className="p-2">{room.number}</td>
                <td className="p-2">{room.type}</td>
                <td className="p-2">{room.status}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white px-2 mt-3 mb-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add New Room</button>
      </div>
    </div>
  );
}
