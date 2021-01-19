import axios from 'axios';


let api = axios.create({
    baseURL:'https://inova-actionsys.herokuapp.com/',
  headers:{
    'Access-Control-Allow-Origin': '*' 
  }
    
});


export default api;