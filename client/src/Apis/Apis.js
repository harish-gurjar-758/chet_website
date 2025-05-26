// src/api/Apis.js
import axios from 'axios';

const BASE_API = 'http://localhost:5001/api';
// const BASE_API = process.env.MAIN_API;

// ----------------
// -- Auth APIs --
// ----------------

// Check Auth
export const CheckAuthentication = async () => {
    try {
        const response = await axios.get(`${BASE_API}/auth/check`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Auth check failed:", error.message);
        throw error;
    }
};

// Sign Up
export const SignUp = async (data) => {
    try {
        const response = await axios.post(`${BASE_API}/auth/signup`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Sign up failed:", error.message);
        throw error;
    }
};

// Sign In
export const SignIn = async (data) => {
    try {
        const response = await axios.post(`${BASE_API}/auth/login`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Sign in failed:", error.message);
        throw error;
    }
};

// -------------------
// -- Message APIs --
// -------------------

// Get All Users
export const Users = async () => {
    try {
        const response = await axios.get(`${BASE_API}/message/users`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Fetching users failed:", error.message);
        throw error;
    }
};
