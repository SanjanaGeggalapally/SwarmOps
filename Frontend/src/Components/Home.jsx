import { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';

const Home = () => {
    const url = "/api/";
    const { isDarkTheme } = useTheme();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate
    const [isOpen, setIsOpen] = useState(false);
    const [homeData, setHomeData] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        const fetchHome = async () => {
          try {
            const response = await axios.get(url);
            setHomeData(response.data);
          } catch (error) {
            setError(error.response ? error.response.data : 'Error fetching home endpoint');
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchHome();
    }, []);

    if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
    }

    return (
        <div><p> message: {homeData.hello}...  </p></div>
    );
};

export default Home;