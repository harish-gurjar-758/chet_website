import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-lg-row flex-column align-items-center justify-content-center bg-dark text-white p-4 top z-5">
      {/* Left side - Form */}
      <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center px-4">
        <div className="w-100" style={{ maxWidth: "450px" }}>
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-2">
              <MessageSquare size={28} className="text-primary" />
            </div>
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="vstack gap-3">
            {/* Email */}
            <div className="form-control">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><Mail className="text-secondary" /></span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><Lock className="text-secondary" /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="me-2 spinner-border spinner-border-sm" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-3 ">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none text-info">Create account</Link>
          </div>
        </div>
      </div>

      {/* Right side - Image Pattern */}
      <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  );
}
