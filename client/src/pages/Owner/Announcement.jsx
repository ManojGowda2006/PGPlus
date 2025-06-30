import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_URL;

export default function OwnerAnnouncementManagement() {
  const [announcements, setAnnouncements] = useState([]);
  const [add, setAdd] = useState(false);
  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
    type: "news",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${API_URL}/announcements`, {
        withCredentials: true,
      });
      setAnnouncements(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Create or Update
  const handleAdd = async () => {
    try {
      if (editingId) {
        // Update
        const res = await axios.patch(
          `${API_URL}/announcements/${editingId}`,
          announcement,
          { withCredentials: true }
        );
        setAnnouncements((prev) =>
          prev.map((a) =>
            a._id === editingId ? res.data.announcement : a
          )
        );
      } else {
        // Create
        const res = await axios.post(
          `${API_URL}/announcements`,
          announcement,
          { withCredentials: true }
        );
        setAnnouncements((prev) => [...prev, res.data.announcement]);
      }

      // Reset form
      setAnnouncement({ title: "", content: "", type: "news" });
      setAdd(false);
      setEditingId(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Start editing
  const startEdit = (a) => {
    setEditingId(a._id);
    setAnnouncement({
      title: a.title,
      content: a.content,
      type: a.type,
    });
    setAdd(true);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/announcements/${id}`, {
        withCredentials: true,
      });
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Announcements</h1>
      <div className="bg-white rounded-lg shadow p-4">
        {announcements.map((a) => (
          <div key={a._id} className="border-b py-2">
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
              <div>
                <h2 className="font-semibold">{a.title}</h2>
                <p className="text-gray-700">{a.content}</p>
                <p className="text-sm text-gray-500">
                  Type: <span className="capitalize">{a.type}</span> •{" "}
                  Posted: {dayjs(a.createdAt).format("DD MMM YYYY, hh:mm A")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  onClick={() => startEdit(a)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(a._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full sm:w-auto"
            onClick={() => {
              setAdd(true);
              setAnnouncement({ title: "", content: "", type: "news" });
              setEditingId(null);
            }}
          >
            Add Announcement
          </button>
        </div>

        {add && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {editingId ? "Edit Announcement" : "New Announcement"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={announcement.title}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={announcement.content}
                  onChange={(e) =>
                    setAnnouncement({
                      ...announcement,
                      content: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={4}
                  placeholder="Write announcement here..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={announcement.type}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, type: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="news">News</option>
                  <option value="menu">Menu</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setAdd(false);
                    setEditingId(null);
                    setAnnouncement({ title: "", content: "", type: "news" });
                  }}
                  className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingId ? "Update" : "Post"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
