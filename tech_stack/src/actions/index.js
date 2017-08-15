export const selectTech = (techId) => {
  return {
    type: 'select_tech',
    payload: techId
  };
}