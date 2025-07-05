import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;
const COLORS = ['#facc15', '#22c55e', '#3b82f6']; // Yellow, Green, Blue

export default function TenantDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [tenant, setTenant] = useState();
  const [tenantId, setTenantId] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [overviewData, setOverviewData] = useState([]);

  const handleLogout = () => {
    navigate("/");
  };

  // Fetch tenant and announcements
  useEffect(() => {
    const fetchAnn = async () => {
      const res = await axios.get(`${API_URL}/announcements`, {
        withCredentials: true
      });
      setAnnouncements(res.data);
    };

    const fetchTenant = async () => {
      const res = await axios.get(`${API_URL}/tenant`, {
        withCredentials: true
      });
      setTenantId(res.data._id);
      setTenant(res.data);
    };

    fetchAnn();
    fetchTenant();
  }, []);

  // Fetch complaints after tenantId is known
  useEffect(() => {
    if (tenantId) {
      const fetchCom = async () => {
        try {
          const res = await axios.get(`${API_URL}/complaints/${tenantId}`, {
            withCredentials: true
          });
          setComplaints(res.data);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchCom();
    }
  }, [tenantId]);

  // Prepare data for pie chart after complaints and announcements are fetched
  useEffect(() => {
    if (complaints.length || announcements.length) {
      const pending = complaints.filter(c => c.status === "Pending").length;
      const resolved = complaints.filter(c => c.status === "Resolved").length;

      setOverviewData([
        { name: 'Pending Complaints', value: pending },
        { name: 'Resolved Complaints', value: resolved },
        { name: 'Active Announcements', value: announcements.length }
      ]);
    }
  }, [complaints, announcements]);

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
          <h1 className="font-bold text-xl mb-2">👋 Welcome! </h1>
          <button onClick={() => navigate("/tenant-dashboard/room")} className="text-left hover:text-blue-600">
            Room Details
          </button>
          <button onClick={() => navigate(`/tenant-dashboard/complaints/${tenantId}`)} className="text-left hover:text-blue-600">
            Complaints
          </button>
          <button onClick={() => navigate("/tenant-dashboard/announcements")} className="text-left hover:text-blue-600">
            Announcements
          </button>
          <button onClick={() => navigate(`/tenant-dashboard/profile/${tenantId}`)} className="text-left hover:text-blue-600">
            Profile Settings
          </button>
          <button onClick={() => navigate("/tenant-dashboard/foodpoll")} className="text-left hover:text-blue-600">
            Vote for Food
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
        <h3>Welcome, {tenant && tenant.fullName}</h3>
        <p className="text-gray-600 mb-4">Keep track of your stay at a glance.</p>

        {/* Announcements Marquee */}
        <div className="bg-white p-3 rounded-lg shadow mb-6 overflow-hidden">
          <marquee>
            <div className="whitespace-nowrap text-blue-600 font-medium">
              {announcements && announcements.map((a, i) => (
                <h4 key={i}>| {a.title} : {a.content} |</h4>
              ))}
            </div>
          </marquee>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Room Number</h2>
            <p className="text-blue-600 text-xl">{tenant?.roomNumber?.doorNumber || "--"}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Rent Due</h2>
            <p className="text-green-600 text-xl">--</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Complaints</h2>
            <p className="text-yellow-500 text-xl">{complaints.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold mb-1">Active Announcements</h2>
            <p className="text-blue-500 text-xl">{announcements.length}</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4">Complaints & Announcements Overview</h3>
          <div className="w-full h-72 p-2 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overviewData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  innerRadius="40%"
                  paddingAngle={3}
                >
                  {overviewData.map((entry, index) => (
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
