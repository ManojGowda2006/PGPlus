import { useState } from "react";

export default function FoodPoll() {
  const [vote, setVote] = useState("");

  const handleVote = (choice) => {
    setVote(choice);
    // TODO: send vote to API
    console.log("Voted:", choice);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Today's Menu</h2>
        <p className="text-gray-700 mb-6">
          🍛 Rice, Dal, Paneer Butter Masala, Salad, Gulab Jamun
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleVote("like")}
            className={`px-6 py-2 rounded-lg text-white ${vote === "like" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"}`}
          >
            👍 Like
          </button>
          <button
            onClick={() => handleVote("dislike")}
            className={`px-6 py-2 rounded-lg text-white ${vote === "dislike" ? "bg-red-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            👎 Dislike
          </button>
        </div>

        {vote && <p className="mt-4 text-blue-600">You voted: {vote}</p>}
      </div>
    </div>
  );
}
