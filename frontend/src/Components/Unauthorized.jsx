
const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-lg">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;