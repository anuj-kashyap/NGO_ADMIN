import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ArrowUpDown } from 'lucide-react';
import Sidebar from './Sidebar'; 

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/volunteer/`);
        setVolunteers(response.data);
        setLoading(false);
        console.log(response.data); 
      } catch (err) {
        setError('Failed to fetch volunteers. Please try again later.');
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredVolunteers = volunteers.filter((volunteer) =>
    Object.values(volunteer).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
    )
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedVolunteers = React.useMemo(() => {
    let sortableVolunteers = [...filteredVolunteers];
    if (sortConfig.key !== null) {
      sortableVolunteers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableVolunteers;
  }, [filteredVolunteers, sortConfig]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 container mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Volunteer Dashboard</h1>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search volunteers..."
            className="w-full p-3 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['name', 'email', 'phone', 'services', 'status'].map((key, index) => (
                  <th
                    key={key} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort(key)}
                  >
                    <div className="flex items-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedVolunteers.map((volunteer, index) => (
                <tr key={volunteer.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">{volunteer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{volunteer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{volunteer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{volunteer.services || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{volunteer.status || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
