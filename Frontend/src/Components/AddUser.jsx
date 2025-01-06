import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [username, setuserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      role,
      username,
    };

    const token = localStorage.getItem('token');  // Get the token from storage

    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include the token
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log('User added successfully:', result);
      toast.success('User added successfully!');
      setEmail('');
      setRole('admin');
      setuserName('');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user: ' + error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 md:p-8 lg:p-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Add User</h1>
        <form className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Name
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
              <FontAwesomeIcon icon={faUserShield} className="mr-2" />
              Role
            </label>
            <select
              className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="superadmin">SuperAdmin</option>
            </select>
          </div>

          <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded transition duration-300 ease-in-out" type="submit">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Add User
          </button>
        </form>
      </div>
    </>
  );
}

export default AddUser;