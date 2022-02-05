const getFilter = (state) => state.filter;
const getContacts = (state) =>
  state.contacts.queries["fetchContacts(undefined)"]?.data;

export { getFilter, getContacts };
