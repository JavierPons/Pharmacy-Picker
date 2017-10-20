export default function(state = '', action) {
  switch (action.type) {
    case 'SELECT_PHARMACY':
      return action.payload;

    default:
      return state;
  }
}
