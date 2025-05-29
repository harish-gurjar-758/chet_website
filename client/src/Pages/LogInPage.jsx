import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../Components/AuthImagePattern';
import toast from 'react-hot-toast';

export default function LogInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { logIn, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) logIn(formData);
    };
    return (
        <div className="d-flex min-vh-100 h-100 text-white d-flex align-items-center jucstify-content-center flex-wrap" style={{ backgroundColor: '#0f172a' }}>
            {/* Left side (form) */}
            <div className="w-50 d-flex flex-column align-items-center justify-content-center">
                <div className="mb-8 text-center">
                    <div className="mb-2 flex justify-center items-center text-4xl">
                        <MessageSquare size={32} className='mb-2 text-primary' />
                    </div>
                    <h1 className="fw-bold">Log In Account</h1>
                    <p className="text-secondary">Welcome Back! Get started with your free account.</p>
                </div>

                <form onSubmit={handleSubmit} className="w-100 form-controler vstack gap-3 d-flex align-items-center jucstify-content-center">

                    {/* Email */}
                    <div className='w-50 form-control'>
                        <label className="block mb-1 font-medium">Email</label>
                        <div className="position-relative bg-transpent">
                            <Mail className="position-absolute top-50  translate-middle-y ms-3 text-dark" />
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
                    <div className='w-50 form-control'>
                        <label className="block mb-1 font-medium">Password</label>
                        <div className="position-relative bg-transpent">
                            <Lock className="position-absolute top-50  translate-middle-y ms-3 text-dark" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control ps-5"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className="btn btn-primary w-45 justify-center"
                    >
                        {isSigningUp ? (
                            <span className="btn btn-primary w-100 justify-center">
                                <Loader2 className="me-2 spinner-border spinner-border-sm"  />
                                Loading...
                            </span>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Already have can't an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side (image) */}
            <div className="w-50 d-none d-lg-flex align-items-center justify-content-center">
                <AuthImagePattern
                    title="Join our community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
            </div>
        </div>
    )
}
