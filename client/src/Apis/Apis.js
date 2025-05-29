// src/api/Apis.js
import axios from 'axios';

const BASE_API = 'http://localhost:5001/api';
// const BASE_API = process.env.MAIN_API; // You can use this in production with a .env file

// ------------------
// -- Auth APIs --
// ------------------

// Check Authentication
export const CheckAuthentication = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${BASE_API}/auth/check`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Expected: { user: {...} }
    } catch (error) {
        console.error("Auth check failed:", error?.response?.data?.message || error.message);
        throw error;
    }
};

// Sign Up
export const SignUp = async (formData) => {
    try {
        const response = await axios.post(`${BASE_API}/auth/signup`, formData, {
            withCredentials: true,
        });
        return response.data; // Expected: { user: {...}, token?: '...' }
    } catch (error) {
        console.error("Sign up failed:", error?.response?.data?.message || error.message);
        throw error;
    }
};

// Sign In
export const SignIn = async (formData) => {
    try {
        const response = await axios.post(`${BASE_API}/auth/login`, formData, {
            withCredentials: true,
        });
        return response.data; // Expected: { user: {...}, token?: '...' }
    } catch (error) {
        console.error("Sign in failed:", error?.response?.data?.message || error.message);
        throw error;
    }
};

// ----------------------
// -- Message APIs --
// ----------------------

// Get All Users
export const Users = async () => {
    try {
        const response = await axios.get(`${BASE_API}/message/users`, {
            withCredentials: true,
        });
        return response.data; // Expected: [ {id, name, ...}, ... ]
    } catch (error) {
        console.error("Fetching users failed:", error?.response?.data?.message || error.message);
        throw error;
    }
};
