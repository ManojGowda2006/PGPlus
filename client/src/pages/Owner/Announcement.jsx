import { useState } from "react";

export default function OwnerAnnouncementManagement() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Power Cut 25th June", date: "20th June" },
    { id: 2, title: "New Menu for Dinner", date: "18th June" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Announcements</h1>
      <div className="bg-white rounded-lg shadow p-4">
        {announcements.map((a) => (
          <div key={a.id} className="border-b py-2">
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
              <div>
                <h2 className="font-semibold">{a.title}</h2>
                <p className="text-sm text-gray-500">Posted: {a.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full sm:w-auto">
            Add Announcement
          </button>
        </div>
      </div>
    </div>
  );
}
