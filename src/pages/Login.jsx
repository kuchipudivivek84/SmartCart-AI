import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", data.token);

      // Save user data
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(
        `Welcome ${data.user?.name || "User"} 🎉`
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-900 via-indigo-900 to-black flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          SmartCart Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Welcome back 👋
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline"
          >
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;