import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserShield, faUser } from '@fortawesome/free-solid-svg-icons';

const AddUser = () => {
  return (
    <>
      <div className="container mx-auto p-6 md:p-8 lg:p-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Add User</h1>
        <form className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email
            </label>
            <input className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" type="email" placeholder="Email" />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
              <FontAwesomeIcon icon={faUserShield} className="mr-2" />
              Role
            </label>
            <select className="shadow-sm appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="role">
              <option value="admin">Admin</option>
              <option value="read-only">Read-Only</option>
              <option value="read-write">Read-Write</option>
            </select>
          </div>
         
          <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded transition duration-300 ease-in-out" type="submit">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Add User
          </button>
        </form>
      </div>
    </>
  );
}

export default AddUser;
