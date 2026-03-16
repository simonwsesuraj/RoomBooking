import React, { useContext, useEffect, useState } from "react";
import "./AuthForm.css";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  async function handleLogin() {
    console.log("Logging In", formData);
    let userData = formData;
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            username: userData.email,
          }), // Payload
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid email or password");
        }
        throw new Error("Login failed");
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Login successful:", data);

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    }
  }
  async function handleRegister() {
    console.log("Registering", formData);
    let userData = formData;
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            username: userData.email,
            full_name: userData.name,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Register failed";
        if (errorData.email && errorData.email[0]) {
          errorMessage = errorData.email[0];
        } else if (errorData.username && errorData.username[0]) {
          errorMessage = errorData.username[0];
        }
        throw new Error(errorMessage);
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Register successful:", data);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setError("");
      navigate("/");
    } catch (error) {
      console.error("Error during register:", error);
      setError(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };
  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ email: "", password: "", name: "" }); // Clear form data when switching
    setError("");
  };
  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login to Your Account" : "Create an Account"}</h2>
        {error && <p className="error-message">{error}</p>}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button className="switcher" onClick={toggleAuthMode}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;