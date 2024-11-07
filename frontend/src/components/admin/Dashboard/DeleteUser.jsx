import React from 'react'
import axios from 'axios'

function DeleteUser({setDeleteModal,email,fetchData}) {
    const confirmLogout = async () => {
        try{
            const response = await axios.delete(`http://localhost:3001/admin/deleteUser?email=${email}`);
            setDeleteModal('')
            fetchData()
        }catch(err){
            console.log(err)
        }
    }

  return (
    
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-zinc-800 rounded-xl p-5 shadow-2xl">
                <div className='flex gap-x-3 items-center mb-4'>
                    <span className='h-7 bg-orange-500 p-1 rounded-xl'></span>
                    <h2 className="text-lg font-semibold">Confirm delete ?</h2>
                </div>
                <p className="mb-4">Are you sure you want to delete user ?</p>
                <div className='flex justify-between mt-9'>
                    <button 
                        onClick={() => setDeleteModal('')} 
                        className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmLogout} 
                        className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded mr-2"
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
   
  )
}

export default DeleteUser