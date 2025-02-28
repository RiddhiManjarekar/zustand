import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5 space-y-4">
      <h2 className="text-xl font-bold">E-Commerce</h2>
      <nav className="flex flex-col space-y-3">
        <Link to="/products" className="p-2 bg-gray-700 rounded hover:bg-gray-600">
          Manage Products
        </Link>
        <Link to="/carts" className="p-2 bg-gray-700 rounded hover:bg-gray-600">
          Manage Carts
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
