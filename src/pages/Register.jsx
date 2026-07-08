import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/users/register", {
        name,
        email,
        password,
      });

      // Save JWT Token
      localStorage.setItem("token", data.token);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Registration Successful 🎉");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-900 via-indigo-900 to-black flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          SmartCart Register
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your account 🚀
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            placeholder="Create Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition duration-300"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login Here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;