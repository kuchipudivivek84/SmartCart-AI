import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { FaEye } from "react-icons/fa";
import { getStoredOrders } from "../utils/orderStorage";

function AdminOrders() {
  const { darkMode } = useContext(DarkModeContext);
  const orders = getStoredOrders();

  const orderStats = {
    pending: orders.filter((o) => o.status === "Pending").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
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
            <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
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
          <h1 className="text-4xl font-bold mb-8">Orders Management</h1>

          {/* Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <p className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Pending</p>
              <p className="text-3xl font-bold mt-2 text-yellow-500">{orderStats.pending}</p>
            </div>
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <p className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Shipped</p>
              <p className="text-3xl font-bold mt-2 text-blue-500">{orderStats.shipped}</p>
            </div>
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <p className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Delivered</p>
              <p className="text-3xl font-bold mt-2 text-green-500">{orderStats.delivered}</p>
            </div>
          </div>

          {/* Orders Table */}
          <div className={`rounded-lg shadow overflow-x-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <table className="w-full">
              <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={`border-t ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                    <td className="p-4 font-semibold">{order.id}</td>
                    <td className="p-4">{order.address?.fullName || "N/A"}</td>
                    <td className="p-4">₹{order.total}</td>
                    <td className="p-4 capitalize">{order.paymentMethod}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-500 text-white"
                            : order.status === "Shipped"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="p-8 text-center text-gray-600">No orders found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminOrders;
