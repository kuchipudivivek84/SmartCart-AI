import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import API from "../Services/api";

function AdminProducts() {
  const { darkMode } = useContext(DarkModeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
          <h2 className="text-2xl font-bold mb-8">SmartCart Admin</h2>
          <nav className="space-y-4">
            <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Dashboard
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Orders
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Users
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Analytics
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Products Management</h1>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              <FaPlus /> Add Product
            </button>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className={`rounded-lg shadow overflow-x-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <table className="w-full">
                <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <tr>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Stock</th>
                    <th className="p-4 text-left">Rating</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 10).map((product) => (
                    <tr key={product.id} className={`border-t ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                      <td className="p-4">
                        <img
                          src={product.thumbnail || product.images?.[0]}
                          alt={product.title}
                          className="h-10 w-10 rounded object-cover"
                        />
                      </td>
                      <td className="p-4 font-semibold">{product.title}</td>
                      <td className="p-4">₹{product.price}</td>
                      <td className="p-4 capitalize">{product.category}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">⭐ {product.rating}</td>
                      <td className="p-4 flex gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminProducts;
