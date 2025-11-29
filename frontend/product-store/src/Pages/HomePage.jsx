import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { products, loading, fetchProducts, deleteProduct } = useContext(AppContext);

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="border-2 border-cyan-400 rounded-2xl p-6 mb-8 inline-block">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Current Products
            </h2>
          </div>

          {loading && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              Loading products...
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No products found!
              </p>
              <Link
                to="/create"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                Create a product
              </Link>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-blue-500 mb-4">
                      ${product.price}
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition">
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want want to delete this product?"
                            )
                          ) {
                            deleteProduct(product._id);
                          }
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
