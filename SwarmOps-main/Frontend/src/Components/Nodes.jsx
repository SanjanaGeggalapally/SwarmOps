import React from "react";

const Nodes = () => {
  return (
    <>
      <nav className="bg-blue-400">
        <span className="ml-8 text-3xl font-bold text-white">Nodes</span>
      </nav>
      <div className="flex flex-row space-x-5 ">
        <div className="w-auto mx-100 bg-white: rounded-xl shadow-md p-8 mt-8 hover:shadow-lg  hover:bg-gray-100 ml-8">
          <div className=" flex flex-col">
            <h2 className="text-xl font-bold">Name of the Node</h2>
            <p className="text-gray-600">
              Id: <span className="text-gray-900">gdhsacsdwi234</span>
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
      
      <div>
        <div className="w-fit bg-white: rounded-xl shadow-md p-8 mt-8 hover:shadow-lg  hover:bg-gray-100 ml-8 ">
          <div className=" flex flex-col">
            <h2 className="text-xl font-bold">Name of the Node</h2>
            <p className="text-gray-600">
              Id: <span className="text-gray-900">gdhsacsdwi234</span>
            </p>
          </div>
          <br />
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
      </div>
      </div>
    </>
  );
};

export default Nodes;
