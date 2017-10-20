export default function(state = {}, action) {
  switch (action.type) {
    case 'CREATE_POST':
      console.log(action.payload.data.data);
      return action.payload.data;

    default:
      return state;
  }
}
