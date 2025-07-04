import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";  
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const data = [
];

const COLORS = ['#3b82f6', '#10b981', '#facc15', '#f87171'];

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalRooms, setTotalRooms] = useState()
  const [Occupied, setOccupied] = useState()
  const [complaints, setComplaints] = useState()
  const [announcements, setAnnouncements] = useState()

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${API_URL}/rooms`, {
          withCredentials: true,
        });
        setTotalRooms(res.data.length); 
        const occupiedCount = res.data.filter(room => room.status === "occupied").length;
        setOccupied(occupiedCount);
      } catch (err) {
        console.log(err.message);
      }
    };
    const fetchCom = async() => {
        try{
          const res = await axios.get(
            `${API_URL}/complaints`,{
              withCredentials : true
            }
          )
          let count = 0;
          for(let i=0; i<res.data.length; i++){
            if(res.data[i].status === "Pending"){
              count++;
            }
          } 
          setComplaints(count)
        }catch(err){
          console.log(err.message)
        }
      }
    const fetchAnn = async() => {
      const res = await axios.get(
        `${API_URL}/announcements`,{
          withCredentials : true
        }
      )
      setAnnouncements(res.data)
    }
    fetchAnn();
    fetchCom();
    fetchRooms();
  },[])

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden justify-between items-center bg-white p-4 shadow">
        <div className="text-2xl font-bold text-blue-600">PGPluse Owner</div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:flex-col bg-white shadow-lg w-full md:w-64 p-4 justify-between`}
      >
        <nav className="flex flex-col gap-4 text-gray-700">
            <h1 className="font-bold text-2xl">Greetings!!</h1>
          <button
            onClick={() => navigate("/owner-dashboard/rooms")}
            className="text-left hover:text-blue-600"
          >
            Manage Rooms
          </button>
          <button
            onClick={() => navigate("/owner-dashboard/tenants")}
            className="text-left hover:text-blue-600"
          >
            Manage Tenants
          </button>
          <button
            onClick={() => navigate("/owner-dashboard/announcements")}
            className="text-left hover:text-blue-600"
          >
            Announcements
          </button>
          <button
            onClick={() => navigate("/owner-dashboard/facilities")}
            className="text-left hover:text-blue-600"
          >
            Facility Monitoring
          </button>
          <button
            onClick={() => navigate("/owner-dashboard/foodpoll")}
            className="text-left hover:text-blue-600"
          >
            Food Poll
          </button>          <button
            onClick={() => navigate("/owner-dashboard/complaints")}
            className="text-left hover:text-blue-600"
          >
            Complaints 
          </button>          
          <button
            onClick={() => navigate("/owner-dashboard/profile")}
            className="text-left hover:text-blue-600"
          >
            Profile Settings
          </button>
        </nav>

        {/* Logout at bottom in desktop, inside nav in mobile */}
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
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, PG Owner!</h1>
      <p className="text-gray-600 mb-6">
        Use the sidebar to manage your PG rooms, tenants, facilities, and announcements.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="font-semibold mb-1">Total Rooms</h2>
          <p className="text-blue-600 text-xl">{totalRooms && totalRooms}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="font-semibold mb-1">Occupied Rooms</h2>
          <p className="text-blue-600 text-xl">{Occupied && Occupied}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="font-semibold mb-1">Pending Complaints</h2>
          <p className="text-blue-600 text-xl">{complaints && complaints}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h2 className="font-semibold mb-1">Active Announcements</h2>
          <p className="text-blue-600 text-xl">{announcements && announcements.length}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4">PG Overview</h3>
        <div className="w-full h-72 p-2 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="70%" // makes it scale properly
                innerRadius="40%"
                paddingAngle={3}
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                layout={window.innerWidth < 768 ? "horizontal" : "vertical"}
                verticalAlign={window.innerWidth < 768 ? "bottom" : "middle"}
                align={window.innerWidth < 768 ? "center" : "right"}
                wrapperStyle={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: window.innerWidth < 768 ? 'center' : 'start',
                fontSize: window.innerWidth < 768 ? '12px' : '14px'
                }}
            />
            </PieChart>
        </ResponsiveContainer>
        </div>


      </div>
    </main>

    </div>
  );
}


