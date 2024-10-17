import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faSignInAlt, faUserPlus, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and sign-up
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Additional state for email during sign-up
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Implement login logic
      if (username === 'a' && password === 'p') {
        onLogin();
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Implement sign-up logic
      if (username && password && email) {
        alert('Sign-up successful');
        setIsLogin(true); // Switch to login after successful sign-up
      } else {
        alert('Please fill in all fields');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center border rounded-lg shadow-sm">
                <span className="px-3 text-gray-500">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border-none rounded-r-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}
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
            {isLogin ? (
              <span className="flex items-center justify-center">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Sign Up
              </span>
            )}
          </button>
        </form>
        <p className="text-center text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
