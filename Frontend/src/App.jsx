import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Nodes from './Components/Nodes';
import Services from './Components/Services';
import Tasks from './Components/Tasks';
import Secrets from './Components/Secrets';
import Configs from './Components/Configs';
import Home from './Components/Home';
import { ThemeProvider, useTheme } from './Context/ThemeContext';
import Login from './Components/Login'; // Import your Login component
import AddUser  from './Components/AddUser.jsx';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

 

  return (
    <ThemeProvider>
      <BrowserRouter>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <MainContent isSidebarOpen={isSidebarOpen} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const MainContent = ({ isSidebarOpen }) => {
  const { isDarkTheme } = useTheme();

  return (
    <div className={`transition-all duration-100 ${isSidebarOpen ? 'ml-64' : 'ml-16'} p-4 ${isDarkTheme ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nodes" element={<Nodes />} />
        <Route path="/services" element={<Services />} />
        <Route path="/adduser" element={<AddUser  />} />
      </Routes>
    </div>
  );
};

export default App;