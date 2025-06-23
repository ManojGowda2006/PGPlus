import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const complaintData = [
  { name: 'Pending Complaints', value: 2 },
  { name: 'Resolved Complaints', value: 5 },
];

const COLORS = ['#facc15', '#22c55e'];

export default function TenantDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden justify-between items-center bg-white p-4 shadow">
        <div className="text-2xl font-bold text-blue-600">PGPluse Tenant</div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
        <aside className={`${
        menuOpen ? "block" : "hidden"
        } md:flex md:flex-col bg-white shadow-xl w-full md:w-60 p-4 justify-between rounded-r-lg`}>
        <nav className="flex flex-col gap-4 text-gray-700">
            <h1 className="font-bold text-xl mb-2">👋 Welcome!</h1>
            <button onClick={() => navigate("/tenant-dashboard/room")} className="text-left hover:text-blue-600">
            🏠 Room Details
            </button>
            <button onClick={() => navigate("/tenant-dashboard/complaints")} className="text-left hover:text-blue-600">
            ⚠️ Complaints
            </button>
            <button onClick={() => navigate("/tenant-dashboard/announcements")} className="text-left hover:text-blue-600">
            📢 Announcements
            </button>
            <button onClick={() => navigate("/tenant-dashboard/profile")} className="text-left hover:text-blue-600">
            🙍 Profile Settings
            </button>
            <button onClick={() => navigate("/tenant-dashboard/foodpoll")} className="text-left hover:text-blue-600">
            🍔 Vote for Food
            </button>
        </nav>

        <div className="mt-4 md:mt-auto">
            <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
            Logout
            </button>
        </div>
        </aside>


      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Tenant Dashboard</h1>
        <p className="text-gray-600 mb-4">Keep track of your stay at a glance.</p>

        {/* Announcements Marquee */}
        <div className="bg-white p-3 rounded-lg shadow mb-6 overflow-hidden">
            
          <marquee><div className="whitespace-nowrap  text-blue-600 font-medium">
             Notice: Maintenance work on 25th June. | 🎉 New Wi-Fi plans available. | 🛑 Water supply interruption 24th June 2-4pm.
          </div></marquee>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Room Number</h2>
            <p className="text-blue-600 text-xl">102</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Rent Due</h2>
            <p className="text-green-600 text-xl">₹ 8,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Pending Complaints</h2>
            <p className="text-yellow-500 text-xl">2</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Active Announcements</h2>
            <p className="text-blue-500 text-xl">3</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4">Complaints Overview</h3>
          <div className="w-full h-72 p-2 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complaintData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  innerRadius="40%"
                  paddingAngle={3}
                >
                  {complaintData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  className="text-sm md:text-base"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
