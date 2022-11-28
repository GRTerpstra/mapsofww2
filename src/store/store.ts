import { configureStore } from "@reduxjs/toolkit";
import documentSlice from "./slices/documentsSlice";

const store = configureStore({
    reducer: { documents: documentSlice.reducer, }
})

export default store;