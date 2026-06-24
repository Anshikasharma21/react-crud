import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const Product = ({ product, getProducts }) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Do you really want to delete the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        toast.success("Deleted successfully");
        getProducts();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__img-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card__body">
        <h2 className="product-card__name">{product.name}</h2>
        <div className="product-card__meta">
          <span className="product-card__qty">Qty: {product.quantity}</span>
          <span className="product-card__price">${product.price}</span>
        </div>
        <div className="product-card__actions">
          <Link to={`/edit/${product._id}`} className="btn-edit">Edit</Link>
          <button onClick={() => deleteProduct(product._id)} className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Product;