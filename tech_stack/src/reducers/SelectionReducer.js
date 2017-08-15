export default (state = null, action) => {
  switch (action.type) {
    case 'select_tech':
      return action.payload;
    default:
      return state;
  }
}