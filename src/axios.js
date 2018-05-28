import axios from 'axios';

const instance = axios.create({
  baseUrl: 'https://jsonplaceholder.typicode.com'
});

export default instance;