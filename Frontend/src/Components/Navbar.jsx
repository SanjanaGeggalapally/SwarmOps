
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faTachometerAlt, faCube, faServer, faUserPlus, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext'; 
import logo from '../assets/RealPage_logo.png'; // Adjust the path as necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isDarkTheme, logout, isLoggedIn, userRole } = useTheme(); // Destructure isLoggedIn and userRole
  const navigate = useNavigate(); // Define navigate using useNavigate hook
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarOpen]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    toast.success("Logout Successful")
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className='bg-white'>
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 p-3 rounded-full transition-all duration-100
            ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-delftBlue text-white hover:bg-gray-200'}`}
          aria-label="Toggle Sidebar"
        >
          <FontAwesomeIcon icon={faThList} />
        </button>
      </div>
      <>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-100
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r 
          ${isDarkTheme ? 'bg-black border-gray-700' : 'bg-white border-gray-300'} 
          md:w-64 w-56`}
        aria-label="Sidebar"
      >
        <div className={`h-full px-3 py-4 overflow-y-auto bg-delftBlue ${isDarkTheme ? 'text-white' : 'text-white'}`}>
          <h1 className={`text-2xl font-semibold tracking-wide mt-2 ml-12 mb-6 ${isDarkTheme ? 'text-white' : 'text-white'}`}>
            SwarmOps
          </h1>
          
          <ul className="space-y-2 font-medium">
            {[
              { name: 'Home', icon: faTachometerAlt, link: '/' },
              { name: 'Services', icon: faCube, link: '/services' },
              { name: 'Nodes', icon: faServer, link: '/nodes' },
              
              ...(userRole === 'superadmin' ? [{ name: 'SuperAdmin', icon: faUserPlus, link: '/superadmin' }] : []),
            ].map(({ name, icon, link }) => (
              <li key={name}>
                <Link
                  to={link}
                  className={`flex items-center p-2 rounded-lg transition-colors duration-100 
                    ${isDarkTheme ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-200 hover:text-black'}`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`w-5 h-5 p-1 rounded transition duration-100 
                      ${isDarkTheme ? 'text-gray-400' : ' text-white'}`}
                  />
                  <span className={`${isDarkTheme ? 'text-gray-400' : ' text-white'} ms-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>{name}</span>
                </Link>
              </li>
            ))}
            {/* Conditionally render the Logout Button */}
            {isLoggedIn ? (
              <>
              <li>
                <button
                  onClick={handleLogout}
                  className={`flex items-center p-2 rounded-lg transition-colors duration-100 
                    ${isDarkTheme ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-200 hover:text-black'}`}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className={`w-5 h-5 p-1 rounded transition duration-100 
                      ${isDarkTheme ? ' text-gray-400' : 'text-white'}`}
                  />
                  <span className={`${isDarkTheme ? 'text-gray-400' : 'text-white'} ms-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
                </button>
              </li>
              </>
            ) : (
              <>
              <li>
                <button
                  onClick={() => { navigate("/login") }}
                  className={`flex items-center p-2 rounded-lg transition-colors duration-100 
                    ${isDarkTheme ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-200 hover:text-black'}`}
                >
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    className={`w-5 h-5 p-1 rounded transition duration-100 
                      ${isDarkTheme ? ' text-gray-400' : 'text-white'}`}
                  />
                  <span className={`${isDarkTheme ? 'text-gray-400' : 'text-white'} ms-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>Login</span>
                </button>
              </li>
              </>
            )}
          </ul>
        </div>
        <div className="absolute bottom-2 ">
          <div className="flex items-center justify-center ">
            <img src={logo} alt="RealPage Logo" className="tracking-wide mt-2  ml-5 mb-6 h-6 w-full" />
          </div>
        </div>
      </aside>
      </>

      {showLogoutModal && (
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 w-10 h-10 mr-4 ml-9" />
              <h2 className="text-2xl font-bold">Logout?</h2>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Navbar;
