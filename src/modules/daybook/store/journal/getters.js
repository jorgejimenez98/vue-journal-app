export const getEntriesByTerm =
  (state) =>
  (term = "") => {
    if (term.length === 0) {
      return state.entries;
    }
    return state.entries.filter((item) =>
      item.text.toLowerCase().includes(term.toLocaleLowerCase())
    );
  };

export const getEntriesById =
  (state) =>
  (id = "") => {
    const item = state.entries.find((item) => item.id === id);
    if (!item) return;
    return { ...item };
  };
