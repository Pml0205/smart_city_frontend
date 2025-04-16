import React, { useState } from "react";
import { UserLogin } from "../lib/types";
import { loginUser } from "../data/api";
import axios from "axios";
const Login = () => {
  const [credentials, setCredentials] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(credentials);
      setMessage("Login successful!");
      console.log("User logged in:", response);

      // 🔐 Optionally: store token or user info
      // localStorage.setItem("user", JSON.stringify(response));

    } /*catch (error: any) {
      setMessage(error.response?.data || "Invalid credentials");
    }*/
     catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data || "Something went wrong");
        } else {
          setMessage("Unexpected error occurred");
        }
      }
      
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
