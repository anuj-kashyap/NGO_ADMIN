// src/components/Donations.jsx
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import Sidebar from './Sidebar';

const mockDonations = [
  { id: 1, donor: 'John Doe', amount: 100, date: '2024-08-25' },
  { id: 2, donor: 'Jane Smith', amount: 250, date: '2024-08-26' },
  { id: 3, donor: 'Mark Johnson', amount: 75, date: '2024-08-27' },
  { id: 4, donor: 'Lucy Brown', amount: 300, date: '2024-08-28' },
];

const Donation = () => {
  const [donations, setDonations] = useState(mockDonations);

  const handleEdit = (id) => {
    console.log(`Editing donation with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting donation with id: ${id}`);
    setDonations(donations.filter((donation) => donation.id !== id));
  };

  return (
    <div className="flex h-screen">
      <div className=" bg-gray-100 dark:bg-gray-900">
        <Sidebar />
      </div>

      <div className="flex-grow p-6  bg-white shadow dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 dark:text-white">Manage Donations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100  dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {donation.donor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    ${donation.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-500 mr-4"
                      onClick={() => handleEdit(donation.id)}
                    >
                      <PencilIcon className="w-5 h-5 inline-block" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500"
                      onClick={() => handleDelete(donation.id)}
                    >
                      <TrashIcon className="w-5 h-5 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donation;
