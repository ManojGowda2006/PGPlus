import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL

export default function TenantComplaints() {

    const {id} = useParams()
    const Navigate = useNavigate()
    const [complaints, setComplaints] = useState([])

    useEffect(() => {
      const fetch = async() => {
        try{
          const res = await axios.get(
            `${API_URL}/complaints/${id}`,{
              withCredentials : true
            }
          )
          setComplaints(res.data)
          console.log(res.data)
        }catch(err){
          console.log(err.message)
        }
      }
      fetch();
    },[])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📌 Your Complaints</h1>

      <div className="space-y-4">
        { complaints && complaints.map((c, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border-l-4
            border-yellow-400 flex justify-between items-center">
            <div>
              <p className="font-semibold">{c.title}</p>
              <p className={`text-sm ${c.status === 'Pending' ? 'text-yellow-500' : 'text-green-600'}`}>
                Status: {c.status}
              </p>
            </div>
            {c.status === 'Pending' && (
              <span className="inline-block bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded">
                Action Needed
              </span>
            )}
            {c.status === 'Resolved' && (
              <span className="inline-block bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Done
              </span>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => Navigate("/tenant-dashboard/newComplaint")} className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
         Raise New Complaint
      </button>
    </div>
  );
}
