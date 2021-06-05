import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.218:3000'
});

// 'http://192.168.0.218:3000' ==> conectar pelo celular estando na rede a cabo (desconectado do Wifi)
// 'http://10.0.2.2:3000'  ==> conectar ao android simulator

export default api;