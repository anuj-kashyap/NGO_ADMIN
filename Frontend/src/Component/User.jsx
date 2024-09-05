import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast for notifications
import { FaTrash } from 'react-icons/fa'; // Importing the trash icon from react-icons
import Navbar from './Navbar';
import  Sidebar  from './Sidebar'; // Make sure you import Sidebar correctly

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/form/getcontact`)
      .then(response => {
        setData(response.data);
        toast.success("Data fetched successfully");
      })
      .catch(error => {
        console.error("There was an error fetching data.", error);
        toast.error("Error fetching data");
      });
  }, []);

  const handleDelete = (email) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/form/deletecontact`, {
      data: { email }
    })
      .then(response => {
        setData(data.filter(contact => contact.email !== email));
        toast.success("Contact deleted successfully");
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        toast.error("Error deleting contact");
      });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedUsers = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex h-screen bg-gray-900">
      <div className="  dark:bg-gray-900">
        <Sidebar />
      </div>
        
        {/* Main Content */}
        <div className="w-4/5 p-6">
          <h1 className="text-3xl text-white md:text-5xl mb-8">Users</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 shadow-lg rounded-lg">
              <thead>
                <tr className='text-lg bg-gray-700'>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedUsers.map((data, index) => (
                  <tr key={index} className=' text-white border-b border-yellow-500'>
                    <td className="py-3 px-4 text-center">{startIndex + index + 1}</td>
                    <td className="py-3 px-4">{data.name}</td>
                    <td className="py-3 px-4">{data.phone}</td>
                    <td className="py-3 px-4">{data.email}</td>
                    <td className="py-3 px-4">{data.comment}</td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={() => handleDelete(data.email)} 
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-yellow-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePreviousPage}
                  className={`py-1 px-4 border rounded ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500'}`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className={`py-1 px-4 border rounded ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500'}`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
