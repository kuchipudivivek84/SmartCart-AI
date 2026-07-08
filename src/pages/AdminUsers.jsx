import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { FaTrash, FaKey } from "react-icons/fa";

function AdminUsers() {
  const { darkMode } = useContext(DarkModeContext);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", joinDate: "2024-02-20" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", joinDate: "2024-01-01" },
  ]);

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setUsers(users.filter((u) => u.id !== id));
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
            <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Orders
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
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
          <h1 className="text-4xl font-bold mb-8">Users Management</h1>

          <div className={`rounded-lg shadow overflow-x-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <table className="w-full">
              <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Join Date</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={`border-t ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                    <td className="p-4 font-semibold">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td className="p-4 flex gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                        <FaKey size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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
        </main>
      </div>
    </div>
  );
}

export default AdminUsers;
