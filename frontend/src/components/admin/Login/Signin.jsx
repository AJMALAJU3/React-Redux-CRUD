import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { setAuthenticated } from '../../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch()

  
  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('http://localhost:3001/admin/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAdmin', true); 
  
        dispatch(setAuthenticated({ user: response.data.user, isAdmin: true }));
  
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='bg-[#64626282] p-10 rounded-md shadow-lg z-10 w-[20rem]'>
      <h2 className='text-2xl mb-4 font-bold text-center text-orange-500'>Admin Sign-in</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <form onSubmit={handleSigninSubmit} className='space-y-4'>
        <div>
          <label htmlFor="email" className='block text-sm font-semibold text-orange-500'>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 outline-none focus:border focus:border-orange-500 bg-[#0000005e] rounded-md text-gray-300'
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className='block text-sm font-semibold text-orange-500'>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 outline-none focus:border focus:border-orange-500 bg-[#0000005e] rounded-md text-gray-300'
            required
          />
        </div>
        
        <button type="submit" className={`w-full py-2 bg-neutral-900 text-orange-500 rounded-md hover:bg-black font-medium ${loading ? 'flex justify-center items-center p-2' : ''}`}>
          {loading ? <Spinner /> : 'Submit'}
        </button>
      </form>
      
    </div>
  );
}

export default Signin;
