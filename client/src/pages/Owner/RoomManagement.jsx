import { useEffect, useState } from "react";
import axios from "axios";
import AddRoomForm from "../../components/AddRoom";
import EditRoomForm from "../../components/EditRoom";

const API_URL = import.meta.env.VITE_API_URL;

export default function OwnerRoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [Delete,setDelete] = useState(false)
  const [delId,setDelId] = useState(null)
  const [Add,setAdd] = useState(false)
  const [tenants,setTenants] = useState([])
  const [editId, setEditID] = useState(null)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_URL}/rooms`, {
          withCredentials: true,
        });
        console.log(res.data);
        setRooms(res.data); 
      } catch (err) {
        console.log(err.message);
      }
    };
    fetch();
  }, []);

  const handleAddClick = async() => {
    setAdd(true)
    const fetch = await axios.get(
      `${API_URL}/rooms/tenants`,{
        withCredentials : true
      }
    )
    setTenants(fetch.data.tenants)
    console.log(fetch.data);

  }

  const AddRoom = async(roomData) => {
    try{
       const res =await axios.post(
        `${API_URL}/rooms`,roomData,{
          withCredentials : true
        }
        )
        console.log(res.data)
        const updated = await axios.get(`${API_URL}/rooms`, { withCredentials: true });
        setRooms(updated.data);
    }catch(err){
      console.log(err.message)
    }
  }

  const handleDelCLick = (id) => {
    setDelete(true)
    setDelId(id);
  }

  const handleDelete = async() => {
    try{
      const res = await axios.delete(
        `${API_URL}/rooms/delete/${delId}`,{
          withCredentials : true
        }
      )
      setRooms(prev => prev.filter(r => r._id !== delId));
      console.log(res.data)
      setDelete(false)
    }catch(err){
      console.log(err)
    }
  }

  const handleEditClick = (id) => {
   setEditID(id)
   setEdit(true)
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Manage Rooms</h1>
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-3 text-left text-sm font-semibold text-gray-700">Room Number</th>
                <th className="p-2 sm:p-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="p-2 sm:p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="p-2 sm:p-3 text-left text-sm font-semibold text-gray-700">Tenants</th>
                <th className="p-2 sm:p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
          <tbody>
            {rooms.map((room, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-2 sm:p-3">{room.doorNumber}</td>
                <td className="p-2 sm:p-3 capitalize">{room.type}</td>
                <td className="p-2 sm:p-3 capitalize">{room.status}</td>
                <td className="p-2 sm:p-3">
                  {room.tenants && room.tenants.length > 0 ? (
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1">
                      {room.tenants.map((tenant) => (
                        <span
                          key={tenant._id}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tenant.fullName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">No tenants</span>
                  )}
                </td>
                <td className="p-2 sm:p-3 space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded"
                  onClick={() => handleEditClick(room._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-3 py-1 rounded"
                    onClick={() => handleDelCLick(room._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          </table>
        </div>
        <div className="flex justify-center sm:justify-end mt-4">
          <button onClick={handleAddClick} className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded">
            Add New Room
          </button>
        </div>
      </div>
      {Delete && 
          <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDelete(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      }
      {Add && (
        <AddRoomForm
          tenants={tenants}
          onCancel={() => setAdd(false)}
          onSubmit={(roomData) => {
            console.log(roomData);
            AddRoom(roomData)
            setAdd(false);
          }}
        />
      )}
      {edit && (
  <EditRoomForm
    room={rooms.find(r => r._id === editId)}
    tenants={tenants}
    onCancel={() => setEdit(false)}
    onSubmit={async ({ roomId, tenants }) => {
      try {
        const res = await axios.put(
          `${API_URL}/rooms/${roomId}`,
          { tenants },
          { withCredentials: true }
        );
        console.log(res.data);
        const updated = await axios.get(`${API_URL}/rooms`, { withCredentials: true });
        setRooms(updated.data);
        setEdit(false);
      } catch (err) {
        console.error(err);
      }
    }}
  />
  )}


    </div>
  );
}
