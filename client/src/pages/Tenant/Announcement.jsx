import { useEffect, useState } from "react";
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL
import dayjs from "dayjs";

export default function TenantAnnouncements() {
  
  const [announcements, setAnnouncements] = useState()

  useEffect(() => {
   const fetchAnn = async() => {
      const res = await axios.get(
        `${API_URL}/announcements`,{
          withCredentials : true
        }
      )
      setAnnouncements(res.data)
    }
    fetchAnn();
  },[])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📢 Announcements</h1>

      <div className="relative overflow-hidden bg-white rounded-lg shadow p-4">
        <marquee><div className="whitespace-nowrap animate-marquee text-blue-600 font-semibold">
        {announcements && announcements.map((a,i) => (
                <h4 key={i}>| {a.title} : {a.content} |</h4> 
              ))}
        </div></marquee>
      </div>

      <div className="mt-6 space-y-4">
        {announcements && announcements.map((a, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="font-semibold">{a.content}</p>
            <p className="text-sm text-gray-500">Posted: {dayjs(a.createdAt).format("DD MMM YYYY, hh:mm A")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
