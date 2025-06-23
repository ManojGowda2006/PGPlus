import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const taskData = [
  { name: 'Pending Tasks', value: 4 },
  { name: 'Completed Tasks', value: 10 },
];

const COLORS = ['#facc15', '#10b981'];

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden justify-between items-center bg-white p-4 shadow">
        <div className="text-2xl font-bold text-blue-600">PGPluse Staff</div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${menuOpen ? "block" : "hidden"} md:flex md:flex-col bg-white shadow-lg w-full md:w-64 p-4 justify-between`}>
        <nav className="flex flex-col gap-4 text-gray-700">
          <h1 className="font-bold text-xl">👋 Hello Staff!</h1>
          <button onClick={() => navigate("/staff-dashboard/facilities")} className="text-left hover:text-blue-600">
            🛠 Update Facilities
          </button>
          <button onClick={() => navigate("/staff-dashboard/announcements")} className="text-left hover:text-blue-600">
            📢 View Announcements
          </button>
        </nav>
        <div className="mt-4 md:mt-auto">
          <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Staff Dashboard</h1>
        <p className="text-gray-600 mb-4">Monitor and update your assigned tasks easily.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h2 className="font-semibold mb-1">Pending Tasks</h2>
            <p className="text-yellow-500 text-xl">4</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h2 className="font-semibold mb-1">Completed Tasks</h2>
            <p className="text-green-600 text-xl">10</p>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4">Task Overview</h3>
          <div className="w-full h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  innerRadius="40%"
                  paddingAngle={3}
                >
                  {taskData.map((entry, index) => (
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
