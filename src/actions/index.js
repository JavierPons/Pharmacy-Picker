import axios from 'axios';

const ROOT_URL = 'http://httpbin.org/post ';

export function createPerscription(values) {
  const request = axios.post(ROOT_URL, values);
  return {
    type: 'CREATE_POST',
    payload: request
  };
}

export function selectPharmacy(selectedPharmacy) {
  return {
    type: 'SELECT_PHARMACY',
    payload: selectedPharmacy
  };
}
