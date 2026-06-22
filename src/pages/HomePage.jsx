import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VITE_BACKEND_URL}/api/products/`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <Link to="/create" className="btn btn-primary">
          + Create Product
        </Link>
      </div>

      {isLoading ? (
        <div className="state-message">
          <span className="spinner" />
          Loading…
        </div>
      ) : products.length === 0 ? (
        <div className="state-message state-empty">
          <p>No products yet.</p>
          <Link to="/create" className="btn btn-ghost">
            Add your first product →
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              getProducts={getProducts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;