import { useState, createContext } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (error) {
      setError("Error fetching products: " + error.message);
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!productData.name || !productData.price || !productData.image) {
      setError("Please fill in all fields");
      setLoading(false);
      return false;
    }
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Product created successfully");
        setProducts([...products, data.data]);
        return true;
      } else {
        setError(data.message || "Failed to create product");
        return false;
      }
    } catch (error) {
      setError("Error: " + error.message);
      console.error("Error creating product: ", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Product deleted successfully");
        setProducts(products.filter((p) => p._id !== productId));
        return true;
      } else {
        setError(data.message || "Failed to delete product");
        return false;
      }
    } catch (error) {
      setError("Error: " + error.message);
      console.error("Error deleting product: ", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, productData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!productData.name || !productData.price || !productData.image) {
      setError("Please fill in all fields");
      setLoading(false);
      return false;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSuccess("Product updated successfully");
        setProducts(products.map((p) => (p._id === productId ? data.data : p)));
        return true;
      } else {
        setError(data.message || "Couldn't update product");
        return false;
      }
    } catch (error) {
      setError("Error: " + error.message);
      console.error("Error updaitng products: ", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    setProducts,
    loading,
    fetchProducts,
    error,
    success,
    setError,
    setSuccess,
    createProduct,
    deleteProduct,
    updateProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
