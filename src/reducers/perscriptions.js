export default function(state = {}, action) {
  // I would test both cases to ensure that state is being set appropriately
  // given an action.type
  switch (action.type) {
    case 'CREATE_POST':
      console.log(action.payload.data.data);
      return action.payload.data;

    default:
      return state;
  }
}
