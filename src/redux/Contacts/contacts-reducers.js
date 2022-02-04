import { createReducer } from "@reduxjs/toolkit";
import { changeFilter } from "./contacts-actions";

export const filterReducer = createReducer("", {
  [changeFilter]: (_, { payload }) => payload,
});
