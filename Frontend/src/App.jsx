import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Nodes from './Components/Nodes';
import Services from './Components/Services';
import Home from './Components/Home';
import { ThemeProvider, useTheme } from './Context/ThemeContext';
import AddUser  from './Components/AddUser.jsx';
import ServiceInspect from './Components/ServiceInspect.jsx';
import Login from './Components/Login.jsx';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

 

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
        <Route path="/services/inspect/:id" element={<ServiceInspect/>}/>
        <Route path="/login" element={<Login  />} />
      </Routes>
    </div>
  );
};

export default App;