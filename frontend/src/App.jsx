import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/Login'
import UserLogin from './pages/user/Login'
import AdminDashboard from './pages/admin/Dashboard'
import UserProfile from './pages/user/Profile'

function App() {
const isLoggedIn = localStorage.getItem('token') !== null;
const isAdmin = localStorage.getItem('isAdmin') === 'true'; 
console.log(isAdmin, isLoggedIn);


  return (
    <Router>
      <Routes>
        <Route
          path='/admin/dashboard'
          element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to='/admin/login' />}
        />
        <Route
          path='/admin/login'
          element={isLoggedIn && isAdmin ?  <Navigate to='/admin/dashboard' /> : <AdminLogin /> }
        />
       <Route
          path='/login'
          element={isLoggedIn ? <Navigate to="/" /> : <UserLogin />}
        />
        <Route
          path='/'
          element={isLoggedIn ? <UserProfile /> :  <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;