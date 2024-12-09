import { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"; // Import icons
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';

const Nodes = () => {
  const { isDarkTheme } = useTheme();
  const [nodesData, setNodesData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState([]); // Search terms state
  const [editableNode, setEditableNode] = useState(null);

  const url = "/api/nodes/new";

  const fetchNodes = async () => {
    try {
      const response = await axios.get(url);
      setNodesData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : 'Error fetching nodes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
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

  const filteredNodes = nodesData.filter((node) => {
    return searchTerms.every((term) => {
      return (
        node.hostname?.toLowerCase().includes(term) ||
        node.id?.toLowerCase().includes(term) ||
        node.ip_addr?.toLowerCase().includes(term) ||
        node.os?.toLowerCase().includes(term) ||
        node.role?.toLowerCase().includes(term) ||
        node.state?.toLowerCase().includes(term) ||
        node.created_at?.toLowerCase().includes(term) ||
        node.updated_at?.toLowerCase().includes(term)
      );
    });
  });

  const handleEditClick = (node) => {
    setEditableNode(node); // Set the node to be edited
  };

  const handleSaveClick = async (node) => {
    try {
      setIsLoading(true); // Start loading
      const payload = {
        "hostname": node.hostname,
        "ip_addr": node.ip_addr,
        "os": node.os,
        "role": node.role,
        "state": node.state,
        "version": node.version,
      };
      setNodesData((prevNodes) =>
        prevNodes.map((n) => (n.id === node.id ? { ...n, ...node } : n))
      );
      // Send the updated node data to the new API endpoint
      await axios.post(`${url}/update/${node.id}`, payload);

      // Update the local state to reflect the changes
      await fetchNodes();

      setEditableNode(null); // Clear editable node after saving
    } catch (error) {
      console.error("Error saving node:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className={`${isDarkTheme ? "bg-black text-white" : "bg-gray-100 text-black"} h-screen`}>
      {isLoading && <div className="spinner">Loading...</div>}
      <div className="flex justify-between items-center">
        <Link
          to="/nodes"
          className={`ml-3 text-3xl font-bold ${isDarkTheme ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"}`}
        >
          Nodes
        </Link>
      </div>
      <div className={isDarkTheme ? "shadow-md sm:rounded-lg bg-black" : "shadow-md sm:rounded-lg bg-white"}>
        <div className="p-4">
          <label htmlFor="table-search" className ="sr-only">
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
              className={`${
                isDarkTheme
                  ? "bg-gray-700 border border-gray-600 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 pr-10 py-2"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 pr-10 py-2"
              }`}
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
            <thead className={isDarkTheme ? "text-xs text-gray-300 uppercase bg-gray-800" : "text-xs text-white uppercase bg-delftBlue"}>
              <tr>
                <th scope="col" className="px-6 py-3 text-base text-center">Hostname</th>
                <th scope="col" className="px-6 py-3 text-base text-center">ID</th>
                <th scope="col" className="px-6 py-3 text-base text-center">IP Address</th>
                <th scope="col" className="px-6 py-3 text-base text-center">OS</th>
                <th scope="col" className="px-6 py-3 text-base text-center">Role</th>
                <th scope="col" className="px-6 py-3 text-base text-center">State</th>
                <th scope="col" className="px-6 py-3 text-base text-center">Created At</th>
                <th scope="col" className="px-6 py-3 text-base text-center">Updated At</th>
                <th scope="col" className="px-6 py-3 text-base text-center"></th>
                <th scope="col" className="px-6 py-3 text-base text-center"></th>
              </tr>
            </thead>
            <tbody>
              {filteredNodes.map((data) => (
                <tr
                  className={isDarkTheme ? "bg-gray-800 border-b border-gray-700 hover:bg-gray-700" : "bg-white border-b border-gray-300 hover:bg-gray-200"}
                  key={data.id}
                >
                  <td className={ isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {editableNode?.id === data.id ? (
                      <input
                        type="text"
                        value={editableNode.hostname}
                        onChange={(e) => setEditableNode({ ...editableNode, hostname: e.target.value })}
                        className="border border-gray-300 rounded p-1 focus:outline-none focus:ring focus:ring-blue-500"
                      />
                    ) : (
                      data.hostname ?? "Null"
                    )}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.id ?? "Null"}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.ip_addr ?? "Null"}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.os ?? "Null"}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.role ?? "Null"}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.state ?? "Null"}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.created_at ?? "Null"}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 font-medium text-gray-400 whitespace-nowrap text-center" : "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"}>
                    {data.updated_at ?? "Null"}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 text-right text-center" : "px-6 py-4 text-right text-center"}>
                    {editableNode?.id === data.id ? (
                      <button
                        onClick={() => handleSaveClick(editableNode)}
                        className="flex items-center justify-center p-2 rounded-full hover:scale-110 transition-transform duration-200"
                      >
                        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 w-8 h-8" />
                      </button>
                    ) : (
                      <button onClick={() => handleEditClick(data)} className="flex items-center justify-center p-2">
                        <FontAwesomeIcon icon={faPen} className="text-black" />
                      </button>
                    )}
                  </td>
                  <td className={isDarkTheme ? "px-6 py-4 text-center" : "px-6 py-4 text-center"}>
                    <button className={isDarkTheme ? "flex items-center justify-center text-red-600 hover:text-red-800" : "flex items-center justify-center text-red-900 hover:text-red-700"}>
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    </button>
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