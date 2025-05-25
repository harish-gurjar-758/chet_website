import { create } from 'zustand';
import { CheckAuthentication, SignUp } from '../Apis/Apis';
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

    Signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await SignUp(data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    }
}))