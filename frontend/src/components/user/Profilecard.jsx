import React, { useState, useCallback, useEffect, useRef } from 'react';
import profilePic from '../../assets/profile.png';
import axios from 'axios';
import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProfileCard() {
    const [user, setUser] = useState({});
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const inputFocus = useRef(null)

    const userDetails = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const fetchUserData = useCallback(async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await axios.post('http://localhost:3001/getUser', { email });
            if (response.data.user) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleEdit = () => {
        setName(user.name);
        setPhone(user.phone);
        setImage(user.image || ''); // Initialize the image state with the user's current image
        setShowEditPopup(true);
    };

    const handleLogout = () => {
        setShowLogoutPopup(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        setShowLogoutPopup(false);
        window.location.reload();
    };

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.onerror = (err) => console.error('Error reading file', err);
        } else {
            console.error('Please select an image file');
        }
    };

    const submitEdit = async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await axios.patch('http://localhost:3001/editUser', { email, phone, name, image });
            if (response.data.updatedUser) {
                const response = await axios.post('http://localhost:3001/getUser', { email });
                if (response.data.user) {
                    setUser(response.data.user);
                }
            }
            setShowEditPopup(false);
        } catch (err) {
            console.error('Error updating user data', err);
        }
    };

    return (
        <div className="bg-zinc-800 rounded-xl p-5 flex gap-2">
            <div className="p-1 rounded-xl bg-orange-500"></div>
            <div>
                <div className="flex justify-between">
                    <div className="flex gap-x-2">
                        <p className="text-xl font-semibold text-zinc-200 ml-4">Personal Information</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiSettings
                            className="h-5 w-5 text-orange-500 hover:text-orange-600 cursor-pointer"
                            onClick={handleEdit}
                        />
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 rounded-md bg-orange-500 hover:bg-orange-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="m-2 mt-5 grid grid-cols-6 gap-x-4">
                    <div className="flex justify-center items-center">
                        <img
                            src={user.image || profilePic}
                            alt="Profile"
                            className="h-36 w-36 rounded-full object-cover cursor-pointer border-2 border-opacity-15 border-orange-500"
                        />
                    </div>
                    <div className="col-span-5 flex flex-col justify-center gap-y-7">
                        <div>
                            <p className="text-xl">{user?.name}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-y-4">
                            <div>
                                <p>Phone</p>
                                <p>{user?.phone}</p>
                            </div>
                            <div>
                                <p>Email</p>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showEditPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-zinc-800 rounded-xl p-5 shadow-2xl relative w-80">
                        <div className='flex gap-x-3 items-center mb-10'>
                            <span className='h-7 bg-orange-500 p-1 rounded-xl'></span>
                            <h2 className="text-lg font-semibold">Edit User Information</h2>
                        </div>
                        <img
                            src={image || profilePic}
                            onClick={() => inputFocus.current.click()}
                            alt={`${name}'s profile`}
                            className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-500 group-hover:border group-hover:border-orange-500 group-hover:border-opacity-40 "
                        />
                        <input
                            type="file"
                            ref={inputFocus}
                            className="hidden"
                            onChange={convertToBase64}
                        />
                        <div className="mb-4">
                            <label className="block text-orange-500">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 p-2 focus:border focus:border-orange-500 outline-none rounded w-full bg-neutral-900"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-orange-500">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 p-2 focus:border focus:border-orange-500 outline-none rounded w-full bg-neutral-900"
                            />
                        </div>

                        <button
                            onClick={() => setShowEditPopup(false)}
                            className="absolute top-0 right-0  text-white bg-orange-500 rounded-tr-lg rounded-bl-3xl p-3 font-bold"
                        >
                            X
                        </button>
                        <div className='flex justify-center mt-9'>

                            <button
                                onClick={submitEdit}
                                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded mr-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLogoutPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-zinc-800 rounded-xl p-5 shadow-2xl relative">
                        <div className='flex gap-x-3 items-center mb-4'>
                            <span className='h-7 bg-orange-500 p-1 rounded-xl'></span>
                            <h2 className="text-lg font-semibold">Confirm logout ?</h2>
                        </div>
                        <p className="mb-4">Are you sure you want to log out?</p>
                            <button
                                onClick={() => setShowLogoutPopup(false)}
                                className="absolute top-0 right-0  text-white bg-orange-500 rounded-tr-lg rounded-bl-3xl pl-2 pb-2 p-1 font-bold"
                            >
                               X
                            </button>
                        <div className='flex justify-center mt-9'>
                            <button
                                onClick={confirmLogout}
                                className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded mr-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileCard;
