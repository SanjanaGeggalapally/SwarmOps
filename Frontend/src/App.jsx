import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Nodes from './Components/Nodes';
import Services from './Components/Services';
import Tasks from './Components/Tasks';
import Secrets from './Components/Secrets';
import Configs from './Components/Configs';
import Home from './Components/Home';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nodes" element={<Nodes/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/secret" element={<Secrets/>}/>
        <Route path="/config" element={<Configs/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
