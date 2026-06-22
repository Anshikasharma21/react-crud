import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const ITEMS_PER_PAGE = 8;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

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
        <>
          <div className="products-grid">
            {currentProducts.map((product) => (
              <Product
                key={product._id}
                product={product}
                getProducts={getProducts}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              className="pagination__btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination__btn ${currentPage === page ? "pagination__btn--active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="pagination__btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>

          <p className="pagination__info">
            Showing {startIndex + 1}–{Math.min(endIndex, products.length)} of {products.length} products
          </p>
        </>
      )}
    </div>
  );
};

export default HomePage;