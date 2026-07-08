import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { FaChartBar, FaBox, FaShoppingCart, FaUsers, FaCog } from "react-icons/fa";

function AdminDashboard() {
  const { darkMode } = useContext(DarkModeContext);
  const stats = {
    revenue: 250000,
    orders: 560,
    products: 150,
    users: 1240,
  };

  const adminMenus = [
    { id: 1, name: "Dashboard", icon: FaChartBar, path: "/admin" },
    { id: 2, name: "Products", icon: FaBox, path: "/admin/products" },
    { id: 3, name: "Orders", icon: FaShoppingCart, path: "/admin/orders" },
    { id: 4, name: "Users", icon: FaUsers, path: "/admin/users" },
    { id: 5, name: "Analytics", icon: FaChartBar, path: "/admin/analytics" },
    { id: 6, name: "Settings", icon: FaCog, path: "/admin/settings" },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
          <h2 className="text-2xl font-bold mb-8">SmartCart Admin</h2>
          <nav className="space-y-4">
            {adminMenus.map((menu) => {
              const Icon = menu.icon;
              return (
                <Link
                  key={menu.id}
                  to={menu.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    darkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-purple-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{menu.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, color: "blue" },
              { label: "Orders", value: stats.orders, color: "green" },
              { label: "Products", value: stats.products, color: "purple" },
              { label: "Users", value: stats.users, color: "orange" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <p className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/admin/products"
                className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center font-semibold"
              >
                Manage Products
              </Link>
              <Link
                to="/admin/orders"
                className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg text-center font-semibold"
              >
                View Orders
              </Link>
              <Link
                to="/admin/analytics"
                className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-center font-semibold"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
