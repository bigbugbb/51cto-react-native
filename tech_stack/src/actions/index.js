export const selectTech = (tech) => {
  return {
    type: 'select_tech',
    payload: tech.id
  };
}