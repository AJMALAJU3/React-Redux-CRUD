import React from 'react'
import UserList from '../../components/admin/Dashboard/UserList'

function Dashboard() {
  return (
    <div 
        className='w-[100vw] h-[100vh] relative top-0 left-0 m-0 flex justify-center items-center '  >
         
      <UserList />
    </div>
  )
}

export default Dashboard
