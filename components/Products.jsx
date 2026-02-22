import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Product = ({ product, getProducts }) => {

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "rgba(196, 221, 51, 1)",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/product/${id}`);
        toast.success("Product deleted successfully");
        getProducts();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-28 object-cover" 
      />

      <div className="px-4 pt-2 pb-4">
        <h2 className="font-semibold text-black">{product.name}</h2>

        <div className="text-sm text-black">
          Quantity: {product.quantity}
        </div>

        <div className="text-sm text-black">
          Price: ${product.price}
        </div>

        <div className="mt-2 flex gap-3">
            <Link 
              to={`/edit/${product._id}`} 
                  className="action-btn edit"
            >
              Edit
            </Link>

          <button
              onClick={() => deleteProduct(product._id)}
              className="action-btn"
            >
              Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
