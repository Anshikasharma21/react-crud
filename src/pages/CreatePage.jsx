import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();

    if (!name || !quantity || !price || !image) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await axios.post(`${VITE_BACKEND_URL}/api/products`, {
        name,
        quantity,
        price,
        image,
      });

      toast.success("Product created");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-card__header">
          <Link to="/" className="back-link">← Back</Link>
          <h2 className="form-card__title">Create Product</h2>
        </div>

        <form onSubmit={saveProduct} className="form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="input"
              placeholder="e.g. Wireless Headphones"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input
              className="input"
              placeholder="e.g. 50"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input
              className="input"
              placeholder="e.g. 1299"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              className="input"
              placeholder="https://…"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn--full">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;