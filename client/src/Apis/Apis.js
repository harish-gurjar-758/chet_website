import axios from 'axios';

const BASE_API = 'http://localhost:5001/api';
// const BASE_API = process.env.MAIN_API;

// -----
// -Auth-
// -----

// check
export const CheckAuthentication = async () => {
    try {
        const response = await axios.get(`${BASE_API}/auth/check`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error; // Important to rethrow for store to handle it
    }
};

// Sign Up
export const SignUp = async () => {
    try {
        const response = await axios.post(`${BASE_API}/auth/signup`);
        return response.data;
    } catch (error) {
        console.log("Error in Sign Up User:", error.message);
    }
};

// Sign In
export const SignIn = async () => {
    try {
        const response = await axios.post(`${BASE_API}/auth/login`);
        return response.data;
    } catch (error) {
        console.log("Error in Sign In User : ", error.message);
    }
};


// -----
// - Message -
// -----

// Users
export const Users = async () => {
    try {
        const response = await axios.get(`${BASE_API}/message/users`);
        return response.data;
    } catch (error) {
        console.log("Error in Geting the user List : ", error.message);
    }
}