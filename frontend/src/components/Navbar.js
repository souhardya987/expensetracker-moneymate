import React from "react";

function Navbar({ user, onLogout }) {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* App Name */}
      <h1 className="text-2xl font-bold text-indigo-600">MoneyMate</h1>

      {/* Right side: Username + Logout */}
      <div className="flex items-center space-x-6">
        <span className="text-gray-700 font-medium">
          Hi, {user?.name || "User"}
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
