import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSignInAlt, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../Context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserRole } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/api/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);
      if (response.ok) {
        toast.success('Login successful!');
        setIsLoggedIn(true);
        setUserRole(result.role);
        localStorage.setItem('token', result.token);
      } else {
        console.log("Error:", result.message);
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error('An error occurred during login.');
    }
  };

  if (isLoggedIn) {
    return (<>
            <div>You are already logged in.</div>
            </>)
          ;
  }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <span className="px-3 text-gray-500">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border-none rounded-r-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <span className="px-3 text-gray-500">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border-none rounded-r-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="px-3 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="flex items-center justify-center">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </span>
          </button>
        </form>
      </div>
    </div>
   
    </>
  );
};

export default Login;