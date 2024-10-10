import React from 'react'

const Test = () => {
  return (
    <nav class="bg-gray-800 h-24 py-4">
  <div class="container mx-auto px-4 flex justify-start items-center">
    <div class="flex flex-1 justify-start items-center">
      <a href="#" class="text-lg font-bold text-white">Logo</a>
      <ul class="flex items-center ml-4">
        <li class="mr-6">
          <a href="#" class="text-white hover:text-gray-300">Home</a>
        </li>
        <li class="mr-6">
          <a href="#" class="text-white hover:text-gray-300">About</a>
        </li>
        <li>
          <a href="#" class="text-white hover:text-gray-300">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Test
