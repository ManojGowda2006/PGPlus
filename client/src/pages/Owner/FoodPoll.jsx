import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const COLORS = ["#10b981", "#facc15", "#f87171"];

export default function FoodPollResults() {
  const [mealTime, setMealTime] = useState("Lunch");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState("");
  const [menuId, setMenuId] = useState(null);
  const [pollData, setPollData] = useState([]);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API_URL}/menu/${date}`, {
        params: { date, mealTime },
        withCredentials: true,
      });

      if (res.data) {
        setMenuId(res.data._id);
        fetchPollResults(res.data._id);
      } else {
        setMenuId(null);
        setPollData([]);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      setMenuId(null);
      setPollData([]);
    }
  };

  const fetchPollResults = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/foodpoll/${id}`, {
        withCredentials: true,
      });

      const { results } = res.data;
      setPollData([
        { name: "Good", value: results.Good },
        { name: "Average", value: results.Average },
        { name: "Bad", value: results.Bad },
      ]);
    } catch (error) {
      console.error("Error fetching poll results:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/menu`,
        {
          mealTime,
          date,
          items: items.split(",").map((i) => i.trim()),
        },
        { withCredentials: true }
      );
      alert("Menu added successfully!");
      setItems("");
      fetchMenu();
    } catch (error) {
      console.error("Error adding menu:", error);
      alert("Failed to add menu.");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [mealTime, date]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🍽️ Food Poll Dashboard</h1>

      <div className="bg-white p-5 rounded-lg shadow-md mb-10">
        <h2 className="text-lg font-semibold mb-4 text-indigo-700">➕ Add Today's Menu</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Meal Time</label>
              <select
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Menu Items (comma separated)</label>
              <input
                type="text"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                placeholder="e.g. Rice, Dal, Paneer"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="self-end bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Menu
          </button>
        </form>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4 text-gray-700">📊 Tenant Feedback Summary</h3>
        {menuId ? (
          pollData.length > 0 ? (
            <div className="w-full h-72 p-2 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pollData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    innerRadius="40%"
                    paddingAngle={3}
                  >
                    {pollData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500">No votes yet.</p>
          )
        ) : (
          <p className="text-center text-gray-500">No menu found for selected date & meal time.</p>
        )}
      </div>
    </div>
  );
}
