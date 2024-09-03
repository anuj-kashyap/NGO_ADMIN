// src/components/Sidebar.jsx
import React from 'react';
import { HomeIcon, UserIcon, ChartBarIcon, CogIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">NGO Dashboard</div>
      <nav className="flex-grow">
        <ul>
          <li className="p-4 flex items-center hover:bg-gray-700 transition duration-200">
            <HomeIcon className="w-5 h-5 mr-2" />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 flex items-center hover:bg-gray-700 transition duration-200">
            <UserIcon className="w-5 h-5 mr-2" />
            <Link to="/user">Users</Link>
          </li>
          <li className="p-4 flex items-center hover:bg-gray-700 transition duration-200">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            <Link to="/donation">Donations</Link>
          </li>
          <li className="p-4 flex items-center hover:bg-gray-700 transition duration-200">
            <CogIcon className="w-5 h-5 mr-2" />
            <Link to="/volunteer">Volunteer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
