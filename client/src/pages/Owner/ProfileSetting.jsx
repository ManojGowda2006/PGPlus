import { useState } from "react";

export default function OwnerProfileSettings() {
  const [profile, setProfile] = useState({
    name: "Owner Name",
    email: "owner@example.com"
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="border p-2 rounded w-full"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </div>
    </div>
  );
}
