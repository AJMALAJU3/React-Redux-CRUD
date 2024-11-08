import React, { useState, useEffect } from "react";
import axios from "axios";
import profilePic from '../../../assets/profile.png'
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import bgImg from '../../../assets/bgimg.jpg'
import { FiSettings, FiTrash } from 'react-icons/fi';

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
    <div className={`container mx-auto p-4 rounded-lg `}
    style={{ 
      backgroundImage: `url(${bgImg})`, 
      opacity:'20',
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backdropFilter: 'blur(10px)', 
      position: 'relative'  
    }}>
       <div
    className="absolute inset-0  opacity-90 z-[-1]   bg-gradient-to-r from-black via-gray-800 to-orange-950 rounded-lg"
  ></div>
   <div
    className="absolute inset-0 rounded-lg border border-orange-500 opacity-30 -z-20"
    style={{
      boxShadow: '0px 0px 360px 2px gray',
    }}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-[35rem] overflow-y-auto" style={{scrollbarWidth:'none'}}>
        {filteredUsers.map((user) => (
          <div key={user.id} className=" rounded-lg shadow-lg bg-zinc-800 p-4 text-center border-2 max-h-[17rem]
           hover:border-orange-500 border-gray-700 relative group transition-all duration-300 ease-in-out">
            <img
              src={user?.image || profilePic}
              alt={`${user?.name}'s profile`}
              className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-500 group-hover:border group-hover:border-orange-500 group-hover:border-opacity-40 "
            />
            <h3 className="text-xl font-bold text-white mb-2">{user?.name}</h3>
            <p className="text-gray-300 mb-2">{user?.email}</p>
            <p className="text-gray-300 mb-4">{user?.phone}</p>
            <div className="flex justify-around mt-3">
            <button
              onClick={() => setEditingUser(user)}
              className="absolute bottom-0 w-10 h-10 left-0  text-white bg-gray-700 hover:w-16 hover:h-16 p-2
              transition-all duration-300 ease-in-out group-hover:bg-orange-500 rounded-bl-lg rounded-tr-full pr-4 pt-4 font-bold items-center justify-center flex"
            >
               <FiSettings 
                            className="h-5 w-5 cursor-pointer"

                        />
            </button>
            <button
              onClick={() => setDeleteModal(user?.email)}
              className="absolute bottom-0 right-0 w-10 h-10 text-white bg-gray-700 
             hover:w-16 hover:h-16 
             group-hover:bg-orange-500 
             rounded-br-lg rounded-tl-full 
             pl-4 pt-4 font-bold items-center justify-center flex
             transition-all duration-300 ease-in-out p-2">
             <FiTrash
                            className="h-5 w-5 cursor-pointer"

                        />
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
