import { createSlice} from "@reduxjs/toolkit";
import { DocumentStateType } from "../../vite-env";

const initialState:DocumentStateType = {
    isDocumentLoading: false,
    document: null,
    errors: [],
    saving: false,
    currentUsers: [],
}

const documentSlice = createSlice({
    name:"document",
    initialState, 
    reducers:{
        savingDocument: ( state, action)=>{
            state.saving = action.payload;
        },
        setDocument: ( state, action)=>{
            state.document = action.payload;
        },
        setCurrentUsers: ( state, action)=>{
            state.currentUsers = action.payload;
        }
    }
})

export const { savingDocument, setDocument, setCurrentUsers} = documentSlice.actions;

export default documentSlice.reducer;

