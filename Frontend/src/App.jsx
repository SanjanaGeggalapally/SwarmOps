import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Nodes from './Components/Nodes';
import Services from './Components/Services';
import Tasks from './Components/Tasks';
import Secrets from './Components/Secrets';
import Configs from './Components/Configs';
import Home from './Components/Home';
import ServiceDetails from './Components/ServiceDetails';
import { ThemeProvider, useTheme } from './Context/ThemeContext';
import Login from './Components/Login'; // Import your Login component
import AddUser  from './Components/AddUser.jsx';
import EditService from './Components/EditService';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const handleLogin = () => {
    // Simulate a login action
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        {isAuthenticated ? (
          <>
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <MainContent isSidebarOpen={isSidebarOpen} />
          </>
        ) : (
          <Login onLogin={handleLogin} /> // Pass the login handler to the Login component
        )}
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
        <Route path="/services/edit" element={<EditService />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/configs" element={<Configs />} />
        <Route path="/adduser" element={<AddUser  />} />
      </Routes>
    </div>
  );
};

export default App;