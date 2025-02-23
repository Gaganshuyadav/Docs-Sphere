import { createSlice} from "@reduxjs/toolkit";

export type ComponentStateType = {
    activeDialogForMenuUseIdx: number | null,
    activeDialogForMenuUseBoolean: boolean,
}

const initialState:ComponentStateType = {
    activeDialogForMenuUseIdx: null,
    activeDialogForMenuUseBoolean: false,
}

const documentSlice = createSlice({
    name:"component",
    initialState, 
    reducers:{
        setActiveDialogForMenuUseIdx: ( state, action)=>{
            state.activeDialogForMenuUseIdx = action.payload;
        },
        setActiveDialogForMenuUseBoolean: ( state, action)=>{
            state.activeDialogForMenuUseBoolean = action.payload;
        }
    }
})

export const { setActiveDialogForMenuUseIdx, setActiveDialogForMenuUseBoolean } = documentSlice.actions;

export default documentSlice.reducer;

