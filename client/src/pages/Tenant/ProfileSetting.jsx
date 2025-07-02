import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileSettings() {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  // Fetch tenant once
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_URL}/tenant`, { withCredentials: true });
        setTenant(res.data);
      } catch (err) {
        console.error("Error fetching tenant:", err.message);
      }
    };
    fetch();
  }, []);

  // Fill form once tenant data is fetched
  useEffect(() => {
    if (tenant) {
      setFormData({
        phone: tenant.phone || "",
        email: tenant.email || "",
        password: "", // keep blank
      });
    }
  }, [tenant]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const res = async() => {
      try{
        const msg = await axios.post(
          `${API_URL}/update`,formData,{
            withCredentials : true
          }
        )
        console.log(msg.data)
      }catch(err){
        console.log(err)
      }
    }
    res();
    setFormData({
    phone: "",
    email: "",
    password: "",
  })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center">Profile Settings</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
