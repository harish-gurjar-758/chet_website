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
        <div className="d-flex min-h-screen">
            {/* Left side (form) */}
            <div className="w-50 p-4 d-flex flex-column justify-content-center">
                <div className="mb-8 text-center">
                    <div className="mb-2 flex justify-center items-center text-4xl">
                        <MessageSquare />
                    </div>
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-gray-600">Get started with your free account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="form-control">
                        <label className="block mb-1 font-medium">Full Name</label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3" />
                            <input
                                type="text"
                                className="w-full pl-10 border rounded px-3 py-2"
                                placeholder="Harish Gurjar"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="block mb-1 font-medium">Email</label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3" />
                            <input
                                type="email"
                                className="w-full pl-10 border rounded px-3 py-2"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="block mb-1 font-medium">Password</label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-10 pr-10 border rounded px-3 py-2"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSigningUp ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin" />
                                Loading...
                            </span>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
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
