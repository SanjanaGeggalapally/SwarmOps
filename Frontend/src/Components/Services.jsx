import { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBox } from "@fortawesome/free-solid-svg-icons"; // Import Trash and Box icons
import { Link } from "react-router-dom";
const Services = () => {
  const { isDarkTheme } = useTheme();
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
};

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://backend:5000/services");
        const data = await response.json();
        setServicesData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div>
      <div class="flex justify-between items-center">
        <Link
          to="/services"
          className="text-gray-600 text-3xl font-bold hover:text-gray-900"
        >
          Services
        </Link>

        <div class="flex flex-col mt-2 items-center mr-4">
          <span class="text-xs xs:text-sm text-gray-900 mb-1">
            Showing 1 to 4 of 50 Entries
          </span>
          <div className="flex mt-2 gap-1">
            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
              Prev
            </button>
            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
              Next
            </button>
          </div>
        </div>
      </div>
      <div class="shadow-md sm:rounded-lg">
        <div class="p-4">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What are you looking for?"
            />
          </div>
        </div>
        <table class=" min-w-full  border border-gray-300 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 text-base">
                Name of the Service
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                ID
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                Creation Time
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                Desired State
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                Image Name
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                Labels
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                Port Number
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                Replicas
              </th>
              <th scope="col" className="px-6 py-3 text-base">
                        <p className="ml=1">State:</p>
                        <select aria-label="select border-none">
                            <option class="text-sm ">None</option>
                            <option class="text-sm text-green-800">Running</option>
                            <option class="text-sm text-red-800">Stopped</option>
                        </select>
                    
              </th>
              <th scope="col" class="px-6 py-3 text-base">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-base"></th>
              <th scope="col" class="px-6 py-3 text-base"></th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((s) => (
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                key={s.id}
              >
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.name}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.id}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.creationTime}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.desiredState}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.image}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.labels.environment}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.ports}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center"
                >
                  {s.replicas}
                </td>
                <td
                  scope="row"
                  className={`px-6 py-4 font-medium ${
                    s.runningState === "Running"
                      ? "text-green-600"
                      : "text-red-900"
                  } 
				  dark:text-white whitespace-nowrap`}
                >
                  {s.runningState}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {s.updateStatus}
                </td>
                <td class="px-6 py-4 text-right">
                  <a
                    href="/edit-${s.id}"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
                <td class="row px-6 py-4">
                  <button className="flex items-center justify-center text-red-600 hover:text-red-800">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
