import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../Components/AuthImagePattern';
import toast from 'react-hot-toast';

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { Signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) Signup(formData);
    };

    return (
        <div className="d-flex min-vh-100">
            {/* Left side (form) */}
            <div className="w-50 p-4 d-flex flex-column justify-content-center">
                <div className="mb-4 text-center">
                    <div className="mb-2 d-flex justify-content-center align-items-center fs-2">
                        <MessageSquare />
                    </div>
                    <h1 className="h3 fw-bold">Create Account</h1>
                    <p className="text-secondary">Get started with your free account</p>
                </div>

                <form onSubmit={handleSubmit} className="vstack gap-4">
                    {/* Full Name */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Full Name</label>
                        <div className="position-relative d-flex align-items-center">
                            <User className="position-absolute start-0 ms-3" />
                            <input
                                type="text"
                                className="form-control ps-5"
                                placeholder="Harish Gurjar"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Email</label>
                        <div className="position-relative d-flex align-items-center">
                            <Mail className="position-absolute start-0 ms-3" />
                            <input
                                type="email"
                                className="form-control ps-5"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Password</label>
                        <div className="position-relative d-flex align-items-center">
                            <Lock className="position-absolute start-0 ms-3" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control ps-5 pe-5"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-sm bg-transparent border-0 position-absolute end-0 me-2"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                    >
                        {isSigningUp ? (
                            <>
                                <Loader2 className="me-2 spinner-border spinner-border-sm" style={{ width: '1.25rem', height: '1.25rem' }} />
                                Loading...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className="text-secondary" style={{ opacity: 0.6 }}>
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary text-decoration-underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side (image) */}
            <div className="d-none d-md-block w-50">
                <AuthImagePattern
                    title="Join our community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
            </div>
        </div>
    );
}
