import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

function AdminSettings() {
  const { darkMode } = useContext(DarkModeContext);
  const [settings, setSettings] = useState({
    storeName: "SmartCart",
    storeEmail: "admin@smartcart.com",
    storePhone: "+91 9876543210",
    apiKey: "****-****-****-****",
    notifications: true,
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert("Settings saved!");
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
            <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Users
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
              Analytics
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700">
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-8">Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Store Settings */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4">Store Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Store Name</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => handleChange("storeName", e.target.value)}
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleChange("storeEmail", e.target.value)}
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settings.storePhone}
                    onChange={(e) => handleChange("storePhone", e.target.value)}
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* API Settings */}
            <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-4">API Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">API Key</label>
                  <input
                    type="password"
                    value={settings.apiKey}
                    readOnly
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Generate New Key
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className={`p-6 rounded-lg shadow mt-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-2xl font-bold mb-4">Preferences</h2>
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange("notifications", e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>

          <button onClick={handleSave} className="mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
            Save Settings
          </button>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
