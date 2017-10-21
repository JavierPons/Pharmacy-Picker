import axios from 'axios';

const ROOT_URL = 'https://httpbin.org/post';

//I would test that both action creators acurately generate their respective actions.

export function createPerscription(values) {
  // makes api call to add the new perscription.
  // emits the returned request
  const request = axios.post(ROOT_URL, values);
  return {
    type: 'CREATE_POST',
    payload: request
  };
}

export function selectPharmacy(selectedPharmacy) {
  // emits the pharmacy a user clicked on.
  return {
    type: 'SELECT_PHARMACY',
    payload: selectedPharmacy
  };
}
