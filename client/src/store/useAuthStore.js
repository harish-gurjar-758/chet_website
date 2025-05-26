import { create } from 'zustand';
import { CheckAuthentication, SignIn, SignUp } from '../Apis/Apis';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isUpdatingProfile: false, 

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const user = await CheckAuthentication();
            set({ authUser: data.user });
        } catch (error) {
            console.log("Error in checkAuth : ", error);
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

    logIn: async (data) => {
        set({ isLogingIn: true });
        try {
            const response = await SignIn(data);
            if (response && response.user) {
                set({ authUser: response.data });
                toast.success("Welcome Back! You are Login successfully");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isLogingIn: false });
        }
    },
}))