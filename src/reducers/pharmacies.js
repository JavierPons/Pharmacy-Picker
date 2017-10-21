export default function(state = '', action) {
  // I would test both cases to ensure that state is being set appropriately
  // given an action.type
  switch (action.type) {
    case 'SELECT_PHARMACY':
      return action.payload;

    default:
      return state;
  }
}
