import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./Contacts/contacts-slice";
import { filterReducer } from "./Contacts/contacts-reducers";

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
  // devTools: process.env.NODE_ENV === "development", //Чтобы тулзы работали на GhPages
});

export default store;
