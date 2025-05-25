import React, { useState } from 'react'
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

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (!formData.password.length > 6) return toast.error("Password must be at least 6 characters");

        return true
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm()

        if (success === true) signup(formData);
    };

    return (
        <div>
            {/* left side */}
            <div>
                <div>
                    {/* Form Logo  */}
                    <div>
                        <div>
                            <MessageSquare />
                        </div>
                        <h1>Create Account</h1>
                        <p>Get started with your free account</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className='form-control'>
                        <label>
                            <span>Full Name</span>
                        </label>
                        <div className='relative'>
                            <div>
                                <User />
                            </div>
                            <input
                                type='text'
                                placeholder='Harish Gurjar'
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="form-control">
                        <label>
                            <span>Email</span>
                        </label>
                        <div className="relative">
                            <div>
                                <Mail />
                            </div>
                            <input
                                type="email"
                                placeholder='you@example.com'
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="form-control">
                        <label>
                            <span>Password</span>
                        </label>
                        <div className="relative">
                            <div>
                                <Lock />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='........'
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff />
                                ) : (
                                    <Eye />
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button type='submit' disabled={isSigningUp}>
                        {isSigningUp ? (
                            <>
                                <Loader2 />
                                loading...
                            </>
                        ) : (
                            "create Account"
                        )}
                    </button>
                </form>
                <div>
                    <p>
                        Alerady have an account?{" "}
                        <Link>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div>
                <AuthImagePattern
                    title="Join our comunity"
                    subtitle="Connect with friends, share monents, and stay in touch with your loved ones."
                />
            </div>
        </div>
    )
}
