export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};
export const updateEntrie = (state, entry) => {
  const idx = state.entries.map((item) => item.id).indexOf(entry.id);
  state.entries[idx] = entry;
};
export const createEntrie = (/* state */) => {};
