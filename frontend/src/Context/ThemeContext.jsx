import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context
const ThemeContext = createContext();

// Custom hook for easier access
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  // const [userName, setUserName] = useState(null);

  useEffect(() => {

    // console.log("dark theme ", isDarkTheme)
    // console.log("is logged in  ", isLoggedIn)
    // console.log("user role ", userRole)

    const userPreference = localStorage.getItem('theme') === 'dark';
    setIsDarkTheme(userPreference);
    document.body.classList.toggle('dark', userPreference);

    
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then(response => {
        console.log("res", response)
        console.log("res data", response.data)
        // setUserName(response.data.username);
        setUserRole(response.data.role); 
        // setIsLoggedIn(true);
        
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        console.log("error is here");
        setIsLoggedIn(false);
        setUserRole(null);
        // setUserName(null);
      });
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark', newTheme);
  };

  useEffect(() => {
    console.log("dark theme ", isDarkTheme)
    console.log("is logged in  ", isLoggedIn)
    console.log("user role ", userRole)
  }, [isLoggedIn, userRole])

  const logout = () => {
    setIsLoggedIn(false);
    // setUserName(null);
    setUserRole(null);
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    // userName, setUserName, 
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, isLoggedIn, setIsLoggedIn, userRole, setUserRole, logout}}>
      {children}
    </ThemeContext.Provider>
  );
};