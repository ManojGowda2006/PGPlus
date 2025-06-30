import { useEffect, useState } from "react";
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export default function OwnerTenantManagement() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${API_URL}/rooms/tenants`,{
        withCredentials : true
      }
      )
      setTenants(res.data.tenants)
    }
    fetch();
  },[])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tenants</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Room</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => (
              <tr key={tenant._id} className="border-b">
                <td className="p-2">{tenant.fullName}</td>
                <td className="p-2">{tenant.roomNumber.doorNumber}</td>
                <td className="p-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
