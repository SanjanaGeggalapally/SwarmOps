import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from "../Context/ThemeContext"; // Import the theme context

const ServiceInspect = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkTheme } = useTheme(); // Get the current theme

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/api/services/inspect/${id}`);
      setServiceDetails(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : 'Error fetching service details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  if (!serviceDetails) return null;

  return (
    <div className={`min-h-screen ${isDarkTheme ? "bg-gray-900" : "bg-gray-100"} flex  justify-center`}>
      <div className="w-full max-w-5xl p-10"> {/* Reduced outer padding further */}
        <h1 className="text-3xl font-bold mb-2 text-center">Service Details</h1> {/* Reduced margin below title */}
        <div className={`rounded-lg shadow-lg ${isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <div className="grid grid-cols gap-2 p-10"> {/* Padding inside the box remains */}
            {Object.entries(serviceDetails).map(([key, value]) => (
              <div key={key} className={`flex justify-between py-2 ${isDarkTheme ? "border-gray-600" : "border-gray-300"} border-b`}>
                <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span>{value !== null ? value.toString() : "Null"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInspect;