import { create } from 'zustand';
import { CheckAuthentication } from '../Apis/Apis';

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
    }
}))