import axios from 'axios';

const BASE_API = process.env.MAIN_API;

// -----
// -Auth-
// -----

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
}