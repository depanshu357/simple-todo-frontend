import "../styles/login.css";
import type React from "react";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { authService } from "../api/services/auth.services";
import { useNavigate, Link } from "react-router";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      authService.login({ username, password }).then((res) => {
        login(res.token);
        navigate("/dashboard");
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <FiLogIn />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                id="username"
                ref={usernameRef}
                placeholder="Enter your username"
                type="text"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                ref={passwordRef}
                placeholder="Enter your password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
