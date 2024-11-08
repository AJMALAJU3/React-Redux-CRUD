import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import profilePic from '../../../assets/profile.png'

function EditUser({ setEditingUser, editingUser, fetchData }) {
  const [name, setName] = useState(editingUser?.name)
  const [phone, setPhone] = useState(editingUser?.phone)
  const [image, setImage] = useState(editingUser?.image)
  const fileInput = useRef(null)  // Correctly define fileInput with useRef

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:3001/editUser', { email: editingUser?.email, phone, name, image });
      setEditingUser(null);
      fetchData();
    } catch (err) {
      console.error('Error updating user data', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 ">
      <div className="bg-[#3f3f3fc4] p-6 rounded-lg shadow-lg  w-80 relative">
      <button 
  onClick={() => setEditingUser(null)} 
  className="absolute top-0 right-0  text-white bg-orange-500 rounded-tr-lg rounded-bl-3xl p-3 font-bold"
>
  X
</button>
      <div className="flex gap-3 items-center mb-7">
          <span className="bg-orange-500 p-1 rounded-lg h-7"></span>
        <h2 className="text-2xl font-bold text-center ">Add User</h2>
        </div>
        <div className="flex justify-center items-center">
          <img 
            src={image || profilePic} 
            alt="Profile" 
            onClick={() => fileInput.current.click()}  // Trigger file input on click
            className="h-36 w-36 rounded-full object-cover cursor-pointer border-2 border-opacity-15 border-orange-500" 
          />
          <input 
            type="file" 
            className="hidden" 
            ref={fileInput} 
            onChange={convertToBase64}  // Convert to base64 on file change
          />
        </div>
        <form onSubmit={handleEditSubmit}>
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
          <div className="flex justify-center">
            
            <button
              type="submit"
              className="bg-orange-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser;
