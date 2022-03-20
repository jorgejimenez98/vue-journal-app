import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");
  const entries = [];
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }
  commit("setEntries", entries);
};

export const updateEntries = async ({ commit }, entry) => {
  const { date, picture, text } = entry;
  const dataToSave = { date, picture, text };

  await journalApi.put(`/entries/${entry.id}.json`, dataToSave);

  commit("updateEntrie", { ...entry });
};

export const createEntries = async () => {};
