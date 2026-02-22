import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Products"; // <-- fixed path
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VITE_BACKEND_URL}/api/product/`);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="p-5 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold !text-white">Products</h1>
        <Link
          to="/create"
          className="!bg-[#2563eb] hover:!bg-[#1d4ed8] !text-white !no-underline px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200"
        >
          Create a Product
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {isLoading ? (
          <div className="col-span-full text-center py-12 text-gray-500">Loading...</div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <Product key={product._id || index} product={product} getProducts={getProducts} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">No products found</div>
        )}
      </div>

      {/* Instagram-style Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-200">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              
              if (
                pageNum <= 2 ||
                pageNum >= totalPages - 1 ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-12 h-12 rounded-lg font-semibold flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-black text-white shadow-md scale-105"
                        : "text-gray-700 hover:bg-gray-100 hover:text-black hover:shadow-sm border border-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="w-12 h-12 flex items-center justify-center text-gray-400 text-sm font-medium">...</span>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;