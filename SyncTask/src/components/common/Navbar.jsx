import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow p-4 justify-between items-center">
            <div className="space-x-4 flex flex-row">
                <a href="#" className="text-gray-600 hover:text-blue-400 font-semibold">Team</a>
                <img src="../../assets/pro-pic.png" alt="pro-pic" className="w-8 h-8" />
            </div>
        </nav>
    );
};

export default Navbar;