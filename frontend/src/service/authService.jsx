import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL; 

export const login = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

   
    const response = await axios.post(`${API_URL}/login`, formData);
    
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
};