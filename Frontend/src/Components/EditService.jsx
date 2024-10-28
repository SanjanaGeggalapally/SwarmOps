import React from 'react'

const EditService = () => {
  return (
    <>
  <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
  <h1 class="text-3xl font-bold mb-4">Edit Service</h1>
  <form class="max-w-md mx-auto">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">Confirm Password</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" placeholder="Confirm Password"/>
    </div>
    <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="submit">Add User</button>
  </form>
</div>
</>
  )
}

export default EditService;
