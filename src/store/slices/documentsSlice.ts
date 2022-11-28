import { createSlice } from "@reduxjs/toolkit";
import { default as documentsData } from '../../data/documentsMock.json'

const documentSlice = createSlice({
    name: "documents",
    initialState: {
        documents: Object.values(documentsData)[0],
        selectedDocument: Object.values(documentsData)[0][0]
    },
    reducers: {
        selectDocument(state: any, action: any) {
            state.selectedDocument = action.payload;
        },
        // addDocument(state: any, action: any) {
        //     state.documents.push(action.payload);
        // },
        // deleteDocument(state: any, action: any) {
        //     state.documents.filter((document: { title: string; }) => document.title !== action.payload.title);
        // },
    },
})

export const { selectDocument } = documentSlice.actions

export default documentSlice