export const setEntries = (state, entries) => {
  state.entries = { ...state.entries, ...entries };
  state.isLoading = false;
};
export const updateEntrie = (/* state */) => {};
export const createEntrie = (/* state */) => {};
