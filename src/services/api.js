import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3333'
});

// 'http://10.0.2.2:3333'  ==> conectar ao android simulator

export default api;