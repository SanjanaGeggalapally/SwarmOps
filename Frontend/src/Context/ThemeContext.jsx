import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context
const ThemeContext = createContext();

// Custom hook for easier access
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Store user role

  useEffect(() => {
    // Check for user preference and apply the correct theme class to the body
    const userPreference = localStorage.getItem('theme') === 'dark';
    setIsDarkTheme(userPreference);
    document.body.classList.toggle('dark', userPreference);

    // Check if user is logged in and fetch user role
    const token = localStorage.getItem('token'); // Assuming you store JWT in localStorage
    if (token) {
      // Optionally, you can verify the token or fetch user data
      axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request
        },
      })
      .then(response => {
        setIsLoggedIn(true);
        setUserRole(response.data.role); // Assuming the response contains the user's role
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        setUserRole(null);
      });
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark', newTheme);
  };

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, isLoggedIn, setIsLoggedIn, userRole, login, logout }}>
      {children}
    </ThemeContext.Provider>
  );
};