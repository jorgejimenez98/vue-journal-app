import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../../mocks/test-journal.state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe("VUEX - Pruebas en el journal module", () => {
  // Basicas
  test("este es el estado inicial, debe de tener este state", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations =========================================
  test("mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit("journal/setEntries", journalState.entries);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  test("mutation: updateEntrie", () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      id: "-MydYHMLNbG63w123xbf",
      date: 1647817103845,
      text: "Nuevo ATTR",
    };
    store.commit("journal/updateEntrie", newEntry);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries[1]).toEqual(newEntry);
    expect(entries.length).toBe(2);
  });

  test("mutation: createEntry and deleteEntry", () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      id: "-MydYHMLNbG63w123xbf",
      date: 1647817103845,
      text: "Nuevo ATTR",
    };
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries.length).toBe(2);

    store.commit("journal/createEntry", newEntry);
    const { entries: entriesCreate } = store.state.journal;
    expect(entriesCreate.length).toBe(3);
    expect(entriesCreate.find((x) => x.id === newEntry.id)).toBeTruthy();

    // delete Entry
    store.commit("journal/deleteEntry", "-MydYHMLNbG63wnW4nuS");
    const { entries: entriesDelete } = store.state.journal;
    expect(entriesDelete.length).toBe(2);
    expect(
      entriesDelete.find((x) => x.id === "-MydYHMLNbG63wnW4nuS")
    ).toBeFalsy();
  });

  // Getters ===========================
  test("getters: getEntriesByTerm, getEntriesById", () => {
    // getEntriesByTerm
    const store = createVuexStore(journalState);
    const [entry1, entry2] = journalState.entries;
    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);
    expect(store.getters["journal/getEntriesByTerm"]("Nuevo").length).toBe(1);

    expect(store.getters["journal/getEntriesByTerm"]("Nuevo")).toEqual([
      entry2,
    ]);

    // getEntriesById
    expect(
      store.getters["journal/getEntriesById"]("-MydYHMLNbG63wnW4nuS")
    ).toEqual(entry1);
  });

  // Actions ===========================
  test("actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");
    expect(store.state.journal.entries.length).toBe(1);
  });

  test("actions: updateEntries", async () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      id: "-MydYHMLNbG63wnW4nuS",
      date: 1647817103845,
      text: "Esto es nuevo",
    };
    await store.dispatch("journal/updateEntries", newEntry);
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.entries[0].text).toBe(newEntry.text);
  });

  test("actions: create and delete entry", async () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      date: 1647817103845,
      text: "Esto es nuevo CREATE",
    };
    await store.dispatch("journal/createEntries", newEntry);
    expect(store.state.journal.entries.length).toBe(3);
    
    await store.dispatch("journal/deleteEntry", '-MydYHMLNbG63w123xbf');
    expect(store.state.journal.entries.length).toBe(2);
  });
});
