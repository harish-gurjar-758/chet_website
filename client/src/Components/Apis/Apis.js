import axios from 'axios';

// Local Api
// const BASE_API = 'http://localhost:3000/api';
const BASE_API = process.env.REACT_APP_BASE_API;


export const SignUp = async () => {
    try {
        const response = await axios.post(`${BASE_API}/auth/signup`);
        return response.data;
    } catch (error) {
        console.log("Error in Sign Up User:", error.message);
    }
};
