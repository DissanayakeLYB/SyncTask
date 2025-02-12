import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 text-black h-screen p-6">
      {/* Logo */}
      <div className="text-2xl font-bold mb-8">
        <span className="text-blue-400">Sync</span>Task
      </div>

      {/* Navigation Links */}
      <nav className="space-y-0">
        <a href="#" className="block hover:bg-gray-700 p-2 rounded">Dashboard</a>
        <a href="#" className="block hover:bg-gray-700 p-2 rounded">Team</a>
        <a href="#" className="block hover:bg-gray-700 p-2 rounded">Settings</a>
      </nav>

      {/* Team Members Section */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">TEAM MEMBERS</h3>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              S
            </div>
            <span>Sarah Wilson</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              M
            </div>
            <span>Michael Chen</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              E
            </div>
            <span>Emily Davis</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              J
            </div>
            <span>James Wilson</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;