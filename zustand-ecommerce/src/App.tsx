import { Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import CartsPage from "./CartsPage";

const App = () => {
  return (
    <div className="p-5">
      <nav className="flex space-x-4 mb-5">
        <Link to="/products" className="p-2 bg-blue-500 text-white rounded">Products</Link>
        <Link to="/carts" className="p-2 bg-green-500 text-white rounded">Carts</Link>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/carts" element={<CartsPage />} />
      </Routes>
    </div>
  );
};

export default App;
