import { useNavigate } from "react-router-dom";

export default function TenantComplaints() {

    const Navigate = useNavigate()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📌 Your Complaints</h1>

      <div className="space-y-4">
        {[
          { title: "WiFi not working", status: "Pending" },
          { title: "Leaky tap in bathroom", status: "Resolved" },
        ].map((c, i) => (
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
