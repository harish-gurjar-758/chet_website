import { create } from 'zustand';
import { CheckAuthentication, SignIn, SignUp } from '../Apis/Apis';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await CheckAuthentication(); // Assuming this returns { user: {...} }
            if (response && response.user) {
                set({ authUser: response.user });
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            console.error("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    Signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await SignUp(formData);
            if (res && res.user) {
                set({ authUser: res.user });
                toast.success("Account created successfully");
            } else {
                toast.error("Signup failed. Please try again.");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Something went wrong during signup";
            toast.error(errorMessage);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logIn: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await SignIn(formData);
            if (res && res.user) {
                set({ authUser: res.user });
                toast.success("Welcome back! You logged in successfully.");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            set({ isLoggingIn: false });
        }
    },
}));
