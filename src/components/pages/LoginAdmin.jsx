import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function AdminLogin() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Custom brand colors
  const colors = ["rgb(247, 244, 46)", "rgb(23, 207, 220)", "rgb(242, 30, 167)"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill in all fields");

    const result = await login(email, password);
    if (result.success) {
      window.location.href = "/admin-dashboard";
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        backgroundSize: "200% 200%",
        animation: "gradientShift 10s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Login</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2"
              style={{
                focusRingColor: colors[1],
                borderColor: "transparent",
                transition: "all 0.2s ease",
              }}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2"
              style={{
                focusRingColor: colors[2],
                borderColor: "transparent",
                transition: "all 0.2s ease",
              }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold transition-all text-white shadow-lg"
            style={{
              background: loading
                ? "rgba(255,255,255,0.3)"
                : `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
              backgroundSize: "200% 200%",
              animation: "gradientShift 5s ease infinite",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-xs text-center mt-6">
          © {new Date().getFullYear()} STEM Inspire Admin Panel
        </p>
      </div>
    </div>
  );
}
