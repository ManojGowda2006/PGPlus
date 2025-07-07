import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function FoodPoll() {
  const [vote, setVote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${API_URL}/menu`, {
          withCredentials: true,
        });
        setMenu(res.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();
  }, []);

  const handleVote = async (choice) => {
    if (!menu?._id) return;

    try {
      await axios.post(
        `${API_URL}/foodpoll/vote`,
        { rating: choice, menuId : menu._id },
        { withCredentials: true }
      );
      setVote(choice);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert("Failed to submit vote.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">🍽️ Food Quality Poll</h1>
        <p className="text-gray-600 mb-4">Your opinion matters! Rate today's food 👇</p>

        {menu ? (
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">📅 Today's Menu</h2>
            <p className="text-gray-700 text-sm">
              {menu.items.map((item, index) => (
                <span key={index}>{item}{index < menu.items.length - 1 ? ", " : ""}</span>
              ))}
            </p>
          </div>
        ) : (
          <p className="mb-6 text-sm text-gray-500">Loading menu...</p>
        )}

        <div className="flex justify-around gap-4 mb-6">
          <VoteCard
            label="Good"
            emoji="😋"
            color="green"
            selected={vote === "Good"}
            onClick={() => handleVote("Good")}
          />
          <VoteCard
            label="Average"
            emoji="😐"
            color="yellow"
            selected={vote === "Average"}
            onClick={() => handleVote("Average")}
          />
          <VoteCard
            label="Bad"
            emoji="😖"
            color="red"
            selected={vote === "Bad"}
            onClick={() => handleVote("Bad")}
          />
        </div>

        {submitted && (
          <div className="mt-4 text-md font-medium text-indigo-700">
            ✅ You voted: <span className="font-bold">{vote}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function VoteCard({ label, emoji, color, selected, onClick }) {
  const bg = selected ? `bg-${color}-600` : `bg-${color}-500 hover:bg-${color}-600`;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-24 h-24 rounded-xl text-white font-semibold text-sm shadow-md transition transform hover:scale-105 ${bg}`}
    >
      <span className="text-2xl">{emoji}</span>
      {label}
    </button>
  );
}
