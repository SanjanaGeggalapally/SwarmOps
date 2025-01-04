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
  

  useEffect(() => {
    
   
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
        setUserRole(response.data.role); 
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        console.log("error is here");
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


  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, isLoggedIn, setIsLoggedIn, userRole, logout, setUserRole}}>
      {children}
    </ThemeContext.Provider>
  );
};