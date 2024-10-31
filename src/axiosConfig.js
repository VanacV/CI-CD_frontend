import axios from 'axios';

axios.defaults.baseURL = 'https://ci-cdbackend-production.up.railway.app';
axios.defaults.withCredentials = true;

export default axios;