import { useState, useEffect } from "react";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/services");
        const data = await response.json();
        setServicesData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServices();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!servicesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:ml-64 lg:ml-64 xl:ml-64 sm:ml-64">
      <nav className="text-blue-400 w-full h-15 mt-6">
      <span className="text-3xl font-bold text-white-400 flex justify-start hover:bg-800 ml-8">Services</span>
      </nav>
      <div className=" grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {servicesData.map((service, _key) => (
          <div key={service.id} className="w-fit bg-white: rounded-xl shadow-md p-8 mt-8 hover:shadow-lg  hover:bg-gray-100 ml-8">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{service.name}</h2>
              <p className="text-gray-600">
                Id: <span className="text-gray-900">{service.id}</span>
              </p>
            </div>
            <br/>
            <div className="flex  flex-row space-x-2">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Inspect
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
