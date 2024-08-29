import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Resetpassword from './resetPassword'; // Import the ResetPasswordModal component
import axios from "axios";
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import man from '../assets/man.png'
// import Navbar from './Navbar';

const Profile = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    image: [''],
  });

  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);
  const [image, setImage] = useState(admin.image);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getuser`, { withCredentials: true });
        const data = response.data;
        setAdmin(prevAdmin => ({
          ...prevAdmin,
          email: data.email,
          name: data.username,
        }));
        setName(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdmin({ ...admin, name, email, image });
    console.log('Updated admin details:', { name, email, image });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleResetPassword = (newPassword) => {
    // Here you would typically also send this data to your server
    console.log('Password reset to:', newPassword);
  };

  const updateUser = async () => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/updateUser`, { email, username: name }, { withCredentials: true });
    toast.success("Updated");
    fetchUser();
  };

  return (
    
         <div className="flex h-screen">
      <div className=" bg-gray-100 dark:bg-gray-900">
        <Sidebar />
      </div>
      <div className="flex-grow p-6  bg-white shadow dark:bg-gray-900">

      <div className=" p-10 ml-60  pt-10 rounded-3xl outline outline-4 bg-opacity-50 outline-white shadow-lg shadow-white h-full w-full max-w-xl">
        <div className="relative flex flex-col items-center">
          <img className="w-40 h-40 outline outline-4 outline-white  shadow-lg shadow-white rounded-full object-cover mb-4" src={man} alt="Admin" />
          <label className="absolute bottom-40 right-32 bg-white p-2 rounded-full shadow-md cursor-pointer">
            <FaPencilAlt className="  text-gray-700" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <h2 className="text-xl font-semibold text-gray-800">{admin.name}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-lg font-medium text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-5 block w-full rounded-3xl border-base-300 bg-white bg-opacity-80 text-black font-semibold p-2 shadow-2xl focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            />
          </div>
          <div className="mt-4">
            <label className="block text-lg font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-5 block w-full rounded-3xl border-base-300 p-2 shadow-2xl bg-white bg-opacity-80 text-black font-semibold focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            />
          </div>
          <button
            onClick={updateUser}
            className="mt-6 ml-40 bg-yellow-500 hover:bg-yellow-500 hover:outline hover:outline-yellow-500 shadow-lg shadow-black text-black font-bold py-2 px-4 rounded-3xl"
          >
            Save & Update
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 ml-40 bg-red-500 shadow-lg hover:outline hover:outline-yellow-500 shadow-black text-black font-bold py-2 px-4 rounded-3xl"
        >
          Reset Password
        </button>
      </div>
      <Resetpassword
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReset={handleResetPassword}
      />
    </div>
    </div>
  );
};

export default Profile;