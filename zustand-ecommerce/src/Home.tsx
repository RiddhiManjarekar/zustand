// src/Home.tsx
import { Link } from 'react-router-dom';
import { Button } from '@shadcn/ui';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl mb-4">Welcome to the E-Commerce App</h1>
        <div className="flex flex-col items-center">
          <Link to="/products">
            <Button className="mb-4">Go to Products</Button>
          </Link>
          <Link to="/cart">
            <Button className="mb-4">Go to Cart</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
