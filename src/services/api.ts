import axios from 'axios';


let api = axios.create({
    baseURL:'https://inova-backend.azurewebsites.net/',
    
});


export default api;