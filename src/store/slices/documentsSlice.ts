import { createSlice } from "@reduxjs/toolkit";
import { default as documentsData } from '../../data/documentsMock.json'

const documentSlice = createSlice({
    name: "documents",
    // TODO: initialState uiteindelijk leeghalen/buiten dit bestand vullen
    initialState: {
        documents: Object.values(documentsData)[0],
        selectedDocument: Object.values(documentsData)[0][0]
    },
    reducers: {
        selectDocument(state: any, action: any) {
            state.selectedDocument = action.payload;
        }
    },
})

export const { selectDocument } = documentSlice.actions

export default documentSlice