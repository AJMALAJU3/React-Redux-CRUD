import React, { useState, useEffect } from "react";
import axios from "axios";
import profilePic from '../../../assets/profile.png'
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import bgImg from '../../../assets/bgimg.jpg'


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [addUser,setAddUser] = useState(false)
  const [deleteModal,setDeleteModal] = useState('')

  const fetchData = () =>{
    axios.get('http://localhost:3001/admin/getAllUsers')
    .then(response => {
      if (response.data.users) {
        setUsers(response.data.users);
      }
    });
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user?.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (String(user?.phone || "").toLowerCase()).includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className={`container mx-auto p-4 rounded-lg ${ addUser || deleteModal !==''|| editingUser?'':'border-orange-500 border'}`}
    style={{ 
      backgroundImage: `url(${bgImg})`, 
      opacity:'20',
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backdropFilter: 'blur(10px)', 
      position: 'relative'  
    }}>
       <div
    className="absolute inset-0  opacity-90 z-[-1]   bg-gradient-to-r from-black via-gray-800 to-orange-950 rounded-xl"
  ></div>
      <div className="flex mb-6 justify-between">
        <div className="flex gap-3 items-center">
          <span className="bg-orange-500 p-1 rounded-lg h-7"></span>
        <h2 className="text-2xl font-bold text-center ">Users List</h2>
        </div>
        <button
              onClick={() => setAddUser(true)}
              className="bg-orange-500 text-white px-2  rounded mr-6"
            >
              add user
            </button>
      </div>
      
      
      <input
        type="text"
        className="mb-4 p-2 bg-zinc-800 rounded w-full border border-gray-600 outline-none focus:border-orange-500 peer"
        placeholder="Search by name, email, or phone"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {editingUser && (
        <EditUser setEditingUser={setEditingUser} editingUser={editingUser} fetchData={fetchData}/>
      )}
      {addUser && <AddUser setAddUser={setAddUser} fetchData={fetchData} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className=" rounded-lg shadow-lg bg-zinc-800 p-4 text-center border-2 hover:border-orange-500 border-gray-700 ">
            <img
              src={user?.image || profilePic}
              alt={`${user?.name}'s profile`}
              className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-500"
            />
            <h3 className="text-xl font-bold text-white mb-2">{user?.name}</h3>
            <p className="text-gray-300 mb-2">{user?.email}</p>
            <p className="text-gray-300 mb-4">{user?.phone}</p>
            <div className="flex justify-around mt-3">
            <button
              onClick={() => setEditingUser(user)}
              className="bg-gray-500 text-white px-2  rounded"
            >
               edit
            </button>
            <button
              onClick={() => setDeleteModal(user?.email)}
              className="bg-red-500 text-white px-2  rounded"
            >
             delete
            </button>
            </div>
          </div>
        ))}
      </div>
      {deleteModal !== '' && <DeleteUser setDeleteModal={setDeleteModal} fetchData={fetchData} email={deleteModal}/>}

    </div>
  );
};

export default UserList;
