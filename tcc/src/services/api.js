import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.12:3333'
});

// 'http://192.168.0.12:3333' ==> conectar pelo celular estando na rede a cabo (desconectado do Wifi)
// 'http://10.0.2.2:3333'  ==> conectar ao android simulator

export default api;