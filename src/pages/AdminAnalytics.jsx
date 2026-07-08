import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { Line, Bar, Pie } from "react-chartjs-2";
import { getStoredOrders } from "../utils/orderStorage";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminAnalytics() {
  const { darkMode } = useContext(DarkModeContext);
  const orders = getStoredOrders();

  const monthlyStats = useMemo(() => {
    const monthLabels = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const revenueByMonth = Array(12).fill(0);
    const ordersByMonth = Array(12).fill(0);
    const categoryCounts = {};
    const productSales = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthIndex = date.getMonth();
      revenueByMonth[monthIndex] += order.total;
      ordersByMonth[monthIndex] += 1;

      order.items?.forEach((item) => {
        const category = item.category || item.brand || "Others";
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;

        const productLabel = item.title || item.name || item.id;
        if (!productSales[productLabel]) {
          productSales[productLabel] = { sales: 0, revenue: 0 };
        }
        productSales[productLabel].sales += 1;
        productSales[productLabel].revenue += item.price;
      });
    });

    const categoryLabels = Object.keys(categoryCounts);
    const categoryValues = Object.values(categoryCounts);
    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5)
      .map(([name, stats]) => ({ name, ...stats }));

    return {
      monthLabels,
      revenueByMonth,
      ordersByMonth,
      categoryLabels,
      categoryValues,
      topProducts,
    };
  }, [orders]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#fff" : "#000",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: darkMode ? "#fff" : "#000",
        },
        grid: {
          color: darkMode ? "#374151" : "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: darkMode ? "#fff" : "#000",
        },
        grid: {
          color: darkMode ? "#374151" : "#e5e7eb",
        },
      },
    },
  };

  const revenueData = {
    labels: monthlyStats.monthLabels,
    datasets: [
      {
        label: "Revenue (₹)",
        data: monthlyStats.revenueByMonth,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const ordersData = {
    labels: monthlyStats.monthLabels,
    datasets: [
      {
        label: "Orders",
        data: monthlyStats.ordersByMonth,
        backgroundColor: "#10b981",
      },
    ],
  };

  const categoryData = {
    labels: monthlyStats.categoryLabels,
    datasets: [
      {
        data: monthlyStats.categoryValues,
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#a78bfa", "#22c55e"],
      },
    ],
  };

  const topProducts = monthlyStats.topProducts.length > 0 ? monthlyStats.topProducts : [
    { name: "No sales data", sales: 0, revenue: 0 },
  ];

  const totalRevenue = monthlyStats.revenueByMonth.reduce((sum, value) => sum + value, 0);
  const totalOrders = monthlyStats.ordersByMonth.reduce((sum, value) => sum + value, 0);
  const averageOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

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
            <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Orders
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Users
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
              Analytics
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-8">Analytics</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
              <p className="text-4xl font-bold">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
              <p className="text-4xl font-bold">{totalOrders}</p>
            </div>
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-xl font-semibold mb-4">Average Order Value</h2>
              <p className="text-4xl font-bold">₹{averageOrderValue.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4">Revenue by Month</h2>
              <Line data={revenueData} options={chartOptions} />
            </div>

            {/* Orders Chart */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4">Orders by Month</h2>
              <Bar data={ordersData} options={chartOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Distribution */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4">Category Distribution</h2>
              <Pie data={categoryData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>

            {/* Top Selling Products */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4">Top Selling Products</h2>
              <div className="space-y-3">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Sales: {product.sales}
                      </p>
                    </div>
                    <p className="font-bold">₹{product.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminAnalytics;
