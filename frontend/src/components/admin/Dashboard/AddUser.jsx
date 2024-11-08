import React,{useState} from 'react'
import Spinner from '../Login/Spinner';
import axios from 'axios';

function AddUser({setAddUser,fetchData}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3001/register', { name, email, password, phone });
            setAddUser(false)
            fetchData()
        } catch (err) {
            console.error('Error:', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            
        <div className='bg-[#64626282] relative p-7 py-14 rounded-md shadow-lg z-10 w-[20rem]'>
        <button onClick={()=>setAddUser(false)} className='absolute top-0 right-0 text-white bg-orange-500 hover:bg-orange-600 rounded-bl-3xl rounded-tr-lg p-2 pb-4 pl-4 font-bold'>X</button>
        <div className="flex mb-6 justify-between">
        <div className="flex gap-3 items-center">
          <span className="bg-orange-500 p-1 rounded-lg h-7"></span>
        <h2 className="text-2xl font-bold text-center ">Add User</h2>
        </div>
        
      </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSignupSubmit} className='space-y-4'>
                
                    
                        <div>
                            <label htmlFor="name" className='block text-sm font-semibold '>Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full p-2 outline-none focus:border focus:border-orange-500 bg-[#0000005e] rounded-md text-gray-300'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phome" className='block text-sm font-semibold '>Phone</label>
                            <input
                                type="number"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className='w-full p-2 outline-none focus:border focus:border-orange-500 bg-[#0000005e] rounded-md text-gray-300'
                                required
                            />
                        </div>
                   
               

                <div>
                    <label htmlFor="email" className='block text-sm font-semibold '>Email</label>
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
                    <label htmlFor="password" className='block text-sm font-semibold '>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 outline-none focus:border focus:border-orange-500 bg-[#0000005e] rounded-md text-gray-300'
                        required
                    />
                </div>

                <button type="submit" className={`w-full py-2 bg-orange-500 rounded-md hover:bg-orange-600 font-medium ${loading ? 'flex justify-center items-center p-2' : ''}`}>
                    {loading ? <Spinner /> : 'Submit'}
                </button>
            </form>
        </div>
        </div>
    )
}

export default AddUser
