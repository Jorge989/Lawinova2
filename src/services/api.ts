import axios from 'axios';


let api = axios.create({
    baseURL:'https://inova-backend-dev.azurewebsites.net/',
  headers:{
    'Access-Control-Allow-Origin': '*' 
  }
    
});


export default api;