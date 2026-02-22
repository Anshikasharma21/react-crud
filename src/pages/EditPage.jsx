import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/product/${id}`);
      setProduct({
        name: response.data.name,
        quantity: response.data.quantity,
        price: response.data.price,
        image: response.data.image,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/product/${id}`, product);
      toast.success("Update a Product Successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className="font-semibold text-2xl mb-4 block text-center text-black">
          Update a Product
        </h2>
        {isLoading ? (
          "Loading"
        ) : (
          <>
            <form onSubmit={updateProduct}>
              <div className="space-y-2">
                <div>
                  <label className="text-black">Name</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:border-blue-200 placeholder-gray-400"
                    placeholder="Enter Name"
                  />
                </div>

                <div>
                  <label className="text-black">Quantity</label>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:border-blue-200 placeholder-gray-400"
                    placeholder="Enter Quantity"
                  />
                </div>

                <div>
                  <label className="text-black">Price</label>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:border-blue-200 placeholder-gray-400"
                    placeholder="Enter Price"
                  />
                </div>

                <div>
                  <label className="text-black">Image URL</label>
                  <input
                    type="text"
                    value={product.image}
                    onChange={(e) => setProduct({ ...product, image: e.target.value })}
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:border-blue-200 placeholder-gray-400"
                    placeholder="Image URL"
                  />
                </div>

                <div>
                  {!isLoading && (
                    <button
                      type="submit"
                      className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPage;
