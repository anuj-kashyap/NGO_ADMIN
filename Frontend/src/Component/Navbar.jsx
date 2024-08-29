import React, { useState, useEffect } from 'react';
import { BellIcon, SearchIcon, UserCircleIcon, SunIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleTheme }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getuser`, { withCredentials: true });
        const data = response.data;
        setUser({
          name: data.username,
          email: data.email,
          image: data.image || '/path/to/default/image.png', // Use a default image if none provided
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow dark:bg-gray-900">
      <div className="text-lg font-semibold dark:text-white">Welcome to the Dashboard</div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-md focus:outline-none focus:border-indigo-500 transition duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <SearchIcon className="absolute right-2 top-2 w-4 h-4 text-gray-500" />
        </div>
        <button className="focus:outline-none">
          <BellIcon className="w-6 h-6 text-gray-600 hover:text-indigo-500 transition duration-200 dark:text-white" />
        </button>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              <img
                src={user.image}
                alt={user.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>{user.name}</span>
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {/* Add logout functionality */}}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <button onClick={toggleTheme} className="focus:outline-none">
          <SunIcon className="w-6 h-6 text-gray-600 hover:text-indigo-500 transition duration-200 dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;