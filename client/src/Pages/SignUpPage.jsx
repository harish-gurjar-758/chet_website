import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthImagePattern from '../Components/AuthImagePattern';

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex flex-lg-row flex-column align-items-center justify-content-center bg-dark text-white p-4">
            {/* Left side - Form */}
            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center px-4">
                <div className="w-100" style={{ maxWidth: '450px' }}>
                    {/* LoGO */}
                    <div className="text-center mb-4">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-2">
                            <MessageSquare size={28} className="text-primary" />
                        </div>
                        <h2 className="fw-bold">Create Account</h2>
                        <p className="text-muted">Get started with your free account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="vstack gap-3">
                        {/* Full Name */}
                        <div>
                            <label className="form-label">Full Name</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white"><User className="text-secondary" /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
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
                        <div>
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white"><Lock className="text-secondary" /></span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
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

                        {/* Submit Button */}
                        <button className="btn btn-primary w-100" type="submit" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="me-2 spinner-border spinner-border-sm" />
                                    Creating...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-3 text-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="text-decoration-none text-primary">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side - Image Pattern */}
            <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
                <AuthImagePattern
                    title="Join our community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
            </div>
        </div>
    );
}
