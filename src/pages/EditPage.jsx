import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${VITE_BACKEND_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.put(`${VITE_BACKEND_URL}/api/products/${id}`, product);
      toast.success("Product updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-card__header">
          <Link to="/" className="back-link">← Back</Link>
          <h2 className="form-card__title">Edit Product</h2>
        </div>

        <form onSubmit={updateProduct} className="form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="input"
              value={product.name}
              placeholder="Enter name"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input
              className="input"
              value={product.quantity}
              placeholder="Enter quantity"
              onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input
              className="input"
              value={product.price}
              placeholder="Enter price"
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              className="input"
              value={product.image}
              placeholder="Enter image URL"
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary btn--full" disabled={isLoading}>
            {isLoading ? "Updating…" : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;