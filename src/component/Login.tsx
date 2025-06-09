import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    alert(`Logged in as: ${email}`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEmail || !registerPassword) {
      setRegisterError("Please enter both email and password.");
      setRegisterSuccess("");
      return;
    }
    setRegisterError("");
    setRegisterSuccess("Registration successful! You can now log in.");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 px-4">
      <form
        onSubmit={showRegister ? handleRegister : handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <div className="text-3xl font-bold mb-8 text-center text-blue-700">
          {showRegister ? "Register" : "Login To See All Users"}
        </div>
        {showRegister ? (
          <>
            {registerError && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {registerError}
              </div>
            )}
            {registerSuccess && (
              <div className="mb-4 text-green-600 text-sm text-center">
                {registerSuccess}
              </div>
            )}
            <div className="mb-5">
              <label
                className="block mb-2 font-semibold text-gray-700"
                htmlFor="registerEmail"
              >
                Email
              </label>
              <input
                id="registerEmail"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                autoComplete="username"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 font-semibold text-gray-700"
                htmlFor="registerPassword"
              >
                Password
              </label>
              <input
                id="registerPassword"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Register
            </button>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setShowRegister(false);
                  setRegisterError("");
                  setRegisterSuccess("");
                }}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <div className="mb-5">
              <label
                className="block mb-2 font-semibold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 font-semibold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setShowRegister(true);
                  setError("");
                }}
              >
                Register
              </button>{" "}
              here
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
