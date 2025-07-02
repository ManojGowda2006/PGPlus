import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'

export default function TenantRoomDetails() {
  const [tenant, setTenant] = useState()

  useEffect(() => {
    const fetchTenant = async() => {
      const res = await axios.get(
        `${API_URL}/tenant`,{
          withCredentials : true
        }
      )
      console.log(res.data)
      setTenant(res.data)
    }
    fetchTenant();
  },[])
  const floorNumber = (doorNumber) => {
     if(doorNumber.includes('10')){
      return 1;
     }else if(doorNumber.includes('20')){
      return 2;
     }else if(doorNumber.includes('30')){
      return 3;
     }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🏠 Your Room Details</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <img src="https://housing-images.n7net.in/01c16c28/acc5cc9191d4a0d1465c6034228e8192/v0/medium/3_rk_-for-rent-sheshadripura-Bangalore-double_sharing_room.jpg"
               alt="Room"
               className="w-32 h-32 rounded-lg shadow" />
          <div>
            <p className="font-semibold text-lg">Room Number: <span className="text-blue-600">{tenant && tenant.roomNumber.doorNumber}</span></p>
            <p className="text-gray-600">{tenant && floorNumber(tenant.roomNumber.doorNumber)}st Floor</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg mb-2">Room Type:</p>
          <p className="text-gray-600 mb-4">{tenant && tenant.roomNumber.type} Sharing</p>

          <p className="font-semibold text-lg mb-2">Rent:</p>
          <p className="text-blue-600 text-xl">{tenant && tenant.roomNumber.type === "Double" ? "₹8,000 / month" : "₹12,000 / month"}</p>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="font-semibold text-lg mb-2">Occupants:</p>
          <p className="text-gray-600">{tenant && tenant.roomNumber.tenants.map((t,i) => (<span key={i}>{t.fullName}&nbsp;<br /></span>))}</p>
        </div>
      </div>
    </div>
  );
}
