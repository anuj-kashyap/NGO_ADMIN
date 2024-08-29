// src/components/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chart from './Chart';

const data = [
  { name: 'Jan', donations: 400 },
  { name: 'Feb', donations: 300 },
  { name: 'Mar', donations: 500 },
  { name: 'Apr', donations: 700 },
  { name: 'May', donations: 600 },
];

const userData = [5, 10, 8, 15, 12, 20, 18, 25, 30, 28, 22, 35];

const Dashboard = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={`flex ${theme}`}>
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar toggleTheme={toggleTheme} />
        <main className="p-6 bg-gray-100 dark:bg-gray-800 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cards for statistics */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Total Donations</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">$12,345</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Active Users</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">120</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Upcoming Events</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5</p>
            </div>
          </div>
          {/* Chart for data visualization */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 dark:text-white">Donation Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="donations" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
        <Chart userData={userData} />
      </div>
    </div>
  );
};

export default Dashboard;
