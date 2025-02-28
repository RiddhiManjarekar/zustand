import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">Welcome to the E-Commerce App</h1>
      <div className="flex justify-center space-x-4">
        <Link to="/products" className="p-3 bg-blue-500 text-white rounded">
          Manage Products
        </Link>
        <Link to="/carts" className="p-3 bg-green-500 text-white rounded">
          Manage Carts
        </Link>
      </div>
    </div>
  );
};

export default Home;
