import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../Components/AuthImagePattern';
import toast from 'react-hot-toast';

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const { Signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Min 6 characters");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) Signup(formData);
    };

    return (
        <div className="d-flex min-vh-100 h-100 text-white d-flex align-items-center jucstify-content-center flex-wrap" style={{ backgroundColor: '#0f172a' }}>
            {/* Left (form) */}
            <div className="w-50 d-flex flex-column align-items-center justify-content-center ">
                <div className="text-center mb-4">
                    <MessageSquare size={32} className="mb-2 text-primary" />
                    <h2 className="fw-bold">Create Account</h2>
                    <p className="text-secondary">Get started with your free account</p>
                </div>
                <form onSubmit={handleSubmit} className="w-100 form-controler vstack gap-3 d-flex align-items-center jucstify-content-center">
                    {/* Full Name */}
                    <div className='w-50 form-control'>
                        <label className="form-label">Full Name</label>
                        <div className="position-relative bg-transpent">
                            <User className="position-absolute top-50  translate-middle-y ms-3 text-dark" />
                            <input
                                className="form-control ps-5"
                                placeholder="Harish Gurjar"
                                value={formData.fullName}
                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className='w-50 form-control'>
                        <label className="form-label">Email</label>
                        <div className="position-relative bg-transprant">
                            <Mail className="position-absolute top-50 translate-middle-y ms-3 text-dark" />
                            <input
                                type="email"
                                className="form-control ps-5"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className='w-50 form-control'>
                        <label className="form-label">Password</label>
                        <div className="position-relative bg-transprant">
                            <Lock className="position-absolute top-50 translate-middle-y ms-3 text-dark" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control ps-5 pe-5"
                                placeholder="********"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
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
                    <button className="btn btn-primary w-45" disabled={isSigningUp}>
                        {isSigningUp ? (
                            <>
                                <Loader2 className="me-2 spinner-border spinner-border-sm" />
                                Loading...
                            </>
                        ) : "Create Account"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p className="text-secondary" style={{ opacity: 0.6 }}>
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary text-decoration-underline">Sign in</Link>
                    </p>
                </div>
            </div>

            {/* Right (grid pattern) */}
            <div className="w-50 d-none d-lg-flex align-items-center justify-content-center ">
                <AuthImagePattern
                    title="Join our community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
            </div>
        </div>
    );
}
