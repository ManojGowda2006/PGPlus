export default function TenantRoomDetails() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🏠 Your Room Details</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <img src="https://housing-images.n7net.in/01c16c28/acc5cc9191d4a0d1465c6034228e8192/v0/medium/3_rk_-for-rent-sheshadripura-Bangalore-double_sharing_room.jpg"
               alt="Room"
               className="w-32 h-32 rounded-lg shadow" />
          <div>
            <p className="font-semibold text-lg">Room Number: <span className="text-blue-600">102</span></p>
            <p className="text-gray-600">1st Floor</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg mb-2">Room Type:</p>
          <p className="text-gray-600 mb-4">Double Sharing</p>

          <p className="font-semibold text-lg mb-2">Rent:</p>
          <p className="text-blue-600 text-xl">₹8,000 / month</p>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <p className="font-semibold text-lg mb-2">Roommates:</p>
          <p className="text-gray-600">John Doe, Jane Smith</p>
        </div>
      </div>
    </div>
  );
}
