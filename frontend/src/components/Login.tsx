import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as apiLogin } from "../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await apiLogin({ email, password });
      setToken(token);
    } catch (error) {
      alert("Login failed: " + (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-80"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
