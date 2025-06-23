export default function TenantAnnouncements() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📢 Announcements</h1>

      <div className="relative overflow-hidden bg-white rounded-lg shadow p-4">
        <marquee><div className="whitespace-nowrap animate-marquee text-blue-600 font-semibold">
          Power maintenance on 25th June ⚡ • New dinner menu available 🍽️ • Cleaning schedule updated 🧹
        </div></marquee>
      </div>

      <div className="mt-6 space-y-4">
        {[
          { text: "Power maintenance on 25th June", date: "20th June" },
          { text: "New menu introduced for dinner", date: "18th June" },
        ].map((a, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="font-semibold">{a.text}</p>
            <p className="text-sm text-gray-500">Posted: {a.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
