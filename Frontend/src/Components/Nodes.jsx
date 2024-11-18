import { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen} from "@fortawesome/free-solid-svg-icons"; // Import icons
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';
 
const Nodes = () => {
  const { isDarkTheme } = useTheme();
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState([]); // Add search terms state
  const [editableService, setEditableService] = useState(null);
 
  const url = "/api/nodes";
  // const url="http://127.0.0.1:5000/servicesStatic"
 
  
  const fetchServices = async () => {
    try {
      const response = await axios.get(url);
      setServicesData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : 'Error fetching services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
 
  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }
 
  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }
 
  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setSearchTerms([...searchTerms, e.target.value.trim().toLowerCase()]);
      e.target.value = "";
    }
  };
 
  const removeSearchTerm = (term) => {
    setSearchTerms(searchTerms.filter((t) => t !== term));
  };
 
  const filteredServices = servicesData.filter((service) => {
    return searchTerms.every((term) => {
      return (
        service.Spec?.Name?.toLowerCase().includes(term) ||
        service.ID?.toLowerCase().includes(term) ||
        (
          service.Endpoint?.Ports?.[0]?.PublishMode +
          " " +
          service.Endpoint?.Ports?.[0]?.Protocol
        )
          ?.toLowerCase()
          .includes(term) ||
        (service.Spec?.TaskTemplate?.ContainerSpec?.Image ?? "")
          .toLowerCase()
          .includes(term) ||
        (
          service.Endpoint?.Ports?.[0]?.PublishedPort +
          ":" +
          service.Endpoint?.Ports?.[0]?.TargetPort
        )
          ?.toLowerCase()
          .includes(term) ||
 
        (service.Spec?.Mode?.Replicated?.Replicas ?? "").toString().includes(term) ||
        (service.Spec?.TaskTemplate?.Runtime ?? "").toLowerCase().includes(term) ||
        (service.Version?.Index ?? "").toString().includes(term) ||
        (service.CreatedAt ?? "").toLowerCase().includes(term)
      );
    });
  });
 
  const handleEditClick = (service) => {
    setEditableService(service); // Set the service to be edited
  };
 
  const handleSaveClick = async (service) => {
    try {
      console.log(service);
      console.log(typeof(service));
      const payload = {
        "Name": service.Spec.Name,
        "Replicas": service.Spec.Mode.Replicated.Replicas,
      };
      setServicesData((prevServices) =>
        prevServices.map((s) => (s.ID === service.ID ? { ...s, ...service } : s))
      );
      // Send the updated service data to the new API endpoint
      await axios.post(`${url}/update/${service.ID}`, payload);
     
      // Update the local state to reflect the changes
      await fetchServices();
 
      setEditableService(null); // Clear editable service after saving
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };
 
  const length = filteredServices.length;
 
  return (
 
    <div className={`${isDarkTheme ? "bg-black text-white" : "bg-gray-100 text-black"} h-screen`}>
      <div className="flex justify-between items-center">
        <Link
          to="/services"
          className={`ml-3 text-3xl font-bold ${isDarkTheme ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"}`}
        >
          Services
        </Link>
 
        <div className="flex flex-col mt-2 items-center mr-4">
          <span className={`text-xs xs:text -sm mb-1 ${isDarkTheme ? "text-gray-400" : "text-gray-900"}`}>
            Showing {length} Services
          </span>
          <div className="flex mt-2 gap-1">
            <button className={`text-sm ${isDarkTheme ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-800"} font-semibold py-2 px-4 rounded-l`}>
              Prev
            </button>
            <button className={`text-sm ${isDarkTheme ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-800"} font-semibold py-2 px-4 rounded-r`}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className={isDarkTheme ? "shadow-md sm:rounded-lg bg-black" : "shadow-md sm:rounded-lg bg-white"}>
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className={isDarkTheme ? "w-5 h-5 text-gray-400" : "w-5 h-5 text-gray-500"}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className={isDarkTheme ? "bg-gray-700 border border-gray-600 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"}
              placeholder="Type and press Enter to add filter"
              onKeyDown={handleSearch}
            />
          </div>
          <div className="mt-2">
            {searchTerms.map((term, index) => (
              <span
                key={index}
                className={isDarkTheme ? "inline-block bg-gray-600 text-gray-400 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded" : "inline-block bg-gray-200 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"}
              >
                {term}
                <button
                  onClick={() => removeSearchTerm(term)}
                  className={isDarkTheme ? "ml-2 text-red-600 hover:text-red-800" : "ml-2 text-red-900 hover:text-red-700"}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
 
        <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-200px)]">
          <table className={isDarkTheme ? "min-w-full border border-gray-600 text-sm text-left text-gray-400" : "min-w-full border border-gray-300 text-sm text-left text-gray-500"}>
            <thead className={isDarkTheme ? "text-xs text-gray-300 uppercase bg-gray-800" : "text-xs text-gray-600 uppercase bg-gray-50"}>
              <tr>
                <th scope="col" className="px-6 py-3 text-base text-center">
                  ID
                </th>
                </tr>
            </thead>
            <tbody>
              {filteredServices.map((data) => (
                <tr
 
                  className={isDarkTheme ? "bg-gray-800 border-b border-gray-700 hover:bg-gray-700" : "bg-white border-b border-gray-300 hover:bg-gray-200"}
                  key={data.ID}
                >
                  
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.ID ?? "Null"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
 
export default Nodes;