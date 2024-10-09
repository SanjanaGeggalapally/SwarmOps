import React from "react";

const Tasks = () => {
  return (
    <>
      <nav class="bg-blue-400">
        <span class="ml-8 text-3xl font-bold text-white">Tasks</span>
      </nav>
      <div class="flex flex-row space-x-5 ">
        <div class="w-fit bg-white: rounded-xl shadow-md p-8 mt-8 hover:shadow-lg  hover:bg-gray-100 ml-8">
          <div class=" flex flex-col">
            <h2 class="text-xl font-bold">Name of the Node</h2>
            <p class="text-gray-600">
              Id: <span class="text-gray-900">gdhsacsdwi234</span>
            </p>
          </div>
          <br />
          <div class="flex  flex-row space-x-2">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Inspect
            </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      
      <div>
        <div class="w-fit bg-white: rounded-xl shadow-md p-8 mt-8 hover:shadow-lg  hover:bg-gray-100 ml-8 ">
          <div class=" flex flex-col">
            <h2 class="text-xl font-bold">Name of the Node</h2>
            <p class="text-gray-600">
              Id: <span class="text-gray-900">gdhsacsdwi234</span>
            </p>
          </div>
          <br />
          <div class="flex  flex-row space-x-2">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Inspect
            </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Tasks;
