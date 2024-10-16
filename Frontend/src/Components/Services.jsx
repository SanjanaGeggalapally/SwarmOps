import { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBox } from '@fortawesome/free-solid-svg-icons'; // Import Trash and Box icons

const Services = () => {
  const { isDarkTheme } = useTheme();
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/services');
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

	<div class="shadow-md sm:rounded-lg">
		<div class="p-4">
			<label for="table-search" class="sr-only">Search</label>
			<div class="relative mt-1">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"></path>
					</svg>
				</div>
				<input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
			</div>
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="p-4">
							<div class="flex items-center">
								<input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
								<label for="checkbox-all-search" class="sr-only">checkbox</label>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							Name of the Service
						</th>
						<th scope="col" class="px-6 py-3">
							ID
						</th>
            <th scope="col" class="px-6 py-3">
							Creation Time
						</th>
            <th scope="col" class="px-6 py-3">
							Desired State
						</th>
            <th scope="col" class="px-6 py-3">
							Image Name
						</th>
            <th scope="col" class="px-6 py-3">
							Labels
						</th>
            <th scope="col" class="px-6 py-3">
							Port Number
						</th>
            <th scope="col" class="px-6 py-3">
							Replicas
						</th>
            <th scope="col" class="px-6 py-3">
							Running State
						</th>
            <th scope="col" class="px-6 py-3">
							Status
						</th>
						<th scope="col" class="px-6 py-3">
							<span class="sr-only">Inspect</span>
						</th>
            <th scope="col" class="px-6 py-3">
              <i class="faTrash"></i>
            </th>
					</tr>
				</thead>
				<tbody>
					{
            servicesData.map(s =>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key = {s.id}>
                <td class="w-4 p-4">
							<div class="flex items-center">
								<input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
								<label for="checkbox-table-search-2" class="sr-only">checkbox</label>
							</div>
						</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.name}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.id}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.creationTime}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.desiredState}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.image}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.labels.environment}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.ports}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.replicas}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.runningState}</td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{s.updateStatus}</td>
                <td class="px-6 py-4 text-right">
							    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
						    </td>
                <td class=" row px-6 py-4">
							    <button className="flex items-center justify-center hover:text-red">
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
              </button>
						    </td>
              </tr>
            )
}
					

				</tbody>
			</table>
		</div>

	</div>
  );
};

export default Services;
