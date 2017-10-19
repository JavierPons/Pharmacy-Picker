import axios from 'axios';

const ROOT_URL = 'https://www.divvydose.com/pharmacy';

export function createPost(values, callback) {
  const request = axios.post(ROOT_URL, values);
  return {
    type: 'CREATE_POST',
    payload: request
  };
}
