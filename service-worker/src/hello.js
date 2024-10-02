import axios from 'axios';

export default function (name) {
  return 'hello' + name;
}

const axiosInstance = axios.create();
