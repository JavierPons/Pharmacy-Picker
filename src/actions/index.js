import axios from 'axios';

const ROOT_URL = 'http://httpbin.org/post ';

export function createPerscription(values) {
  const request = axios.post(ROOT_URL, values);
  return {
    type: 'CREATE_POST',
    payload: request
  };
}
