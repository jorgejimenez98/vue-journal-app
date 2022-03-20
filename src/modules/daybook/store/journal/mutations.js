export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};
export const updateEntrie = (state, entry) => {
  const idx = state.entries.map((item) => item.id).indexOf(entry.id);
  state.entries[idx] = entry;
};
export const createEntry = (state, entry) => {
  state.entries = [entry, ...state.entries];
};

export const deleteEntry = (state, id) => {
  state.entries = state.entries.filter((item) => item.id !== id);
};
