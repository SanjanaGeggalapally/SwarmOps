import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext"; // Import the theme context

const ServiceInspect = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkTheme } = useTheme(); // Get the current theme

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/api/services/inspect/${id}`);
      setServiceDetails(response.data.serviceData);
      setTaskDetails(response.data.tasksData);
    } catch (error) {
      setError(
        error.response ? error.response.data : "Error fetching service details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  if (!serviceDetails) return null;

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-black text-white" : "bg-gray-100 text-black"
      } flex justify-center`}
    >
      <div className="w-full max-w-1xl p-10">
        <h1 className="text-3xl font-bold mb-2 text-center">{serviceDetails.name} Service Details</h1>
        <div
          className={`rounded-lg shadow-lg ${
            isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="grid grid-cols gap-2 p-10">
            {Object.entries(serviceDetails).map(([key, value]) => (
              <div
                key={key}
                className={`flex justify-between py-2 ${
                  isDarkTheme ? "border-gray-600" : "border-gray-300"
                } border-b`}
              >
                <span className="font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>
                <span>{value !== null ? value.toString() : "Null"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Details Table */}
        {taskDetails && taskDetails.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
              {serviceDetails.name} Task Details
            </h2>{" "}
            {/* Adjusted margins here */}
            <div
              className={`mt-4 rounded-lg shadow-lg ${
                isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
              } w-full`}
            >
              <div className="overflow-x-auto">
                <table
                  className={`min-w-full border border-gray-300 ${
                    isDarkTheme ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <thead
                    className={
                      isDarkTheme
                        ? "text-xs text-gray-300 uppercase bg-gray-800"
                        : "text-xs text-white uppercase bg-delftBlue "
                    }
                  >
                    <tr>
                      {Object.keys(taskDetails[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-base text-center"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {taskDetails.map((task, index) => (
                      <tr
                        key={index}
                        className={``}
                      >
                        {Object.entries(task).map(([key, value]) => (
                          <td
                            key={key}
                            className={`${
                              isDarkTheme
                                ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center"
                                : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                            }`}
                          >
                            {value !== null ? value.toString() : "Null"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInspect;
