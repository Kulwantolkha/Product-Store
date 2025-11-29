import { useState, useEffect, useContext } from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useParams, useNavigate} from "react-router-dom";

export default function EditPage() {

  const {updateProduct, getProductById, loading, error, success, setError, setSuccess} = useContext(AppContext);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchProduct = async () => {
        const data = await getProductById(id);
        if(data) {
            setProduct(data);
        }
    };
    fetchProduct();
  }, [id]);

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await updateProduct(id, product);

    if(result) {
      setProduct({name: "", price: "", image: ""});
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-10 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Edit Product
        </h1>
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={handleChanges}
              placeholder="Enter product name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={product.price}
              onChange={handleChanges}
              placeholder="Enter product price"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image"
              value={product.image}
              onChange={handleChanges}
              placeholder="Enter image URL"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            {loading ? "Updating..." : "Update Products"}
          </button>
        </form>
      </div>
    </div>
  );
}
