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
        <a href="#" className="block hover:bg-blue-100 hover:text-blue-500 p-2 rounded mb-2 font-semibold">Dashboard</a>
        <a href="#" className="block hover:bg-blue-100 hover:text-blue-500 p-2 rounded mb-2 font-semibold">Team</a>
        <a href="#" className="block hover:bg-blue-100 hover:text-blue-500 p-2 rounded mb-2 font-semibold">Settings</a>
      </nav>

      {/* Team Members Section */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">TEAM MEMBERS</h3>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3 my-6">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              S
            </div>
            <div className="flex flex-col">
              <span>Sarah Wilson</span>
              <span className="text-xs text-gray-400">UI Designer</span>
            </div>
          </li>
          <li className="flex items-center space-x-3 my-6">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              M
            </div>
            <div className="flex flex-col">
              <span>Michael Chen</span>
              <span className="text-xs text-gray-400">Developer</span>
            </div>
          </li>
          <li className="flex items-center space-x-3 my-6">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              E
            </div>
            <div className="flex flex-col">
              <span>Emily Davis</span>
              <span className="text-xs text-gray-400">Product Manager</span>
            </div>
          </li>
          <li className="flex items-center space-x-3 my-6">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
              J
            </div>
            <div className="flex flex-col">
              <span>James Wilson</span>
              <span className="text-xs text-gray-400">Developer</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;