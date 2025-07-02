import { useState } from "react";
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

export default function RaiseComplaint() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res  = await axios.post(
      `${API_URL}/complaints/`,formData, {
        withCredentials : true
      }
    )
    console.log(res.data)

    setFormData({title: "",
    description: "",
    image: null,
  })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center">Raise New Complaint</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select Title</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="WiFi">WiFi</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="4"
            placeholder="Describe your issue..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Image (optional)</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
