import { createSlice} from "@reduxjs/toolkit";

export type ComponentStateType = {
    activeDialogForMenuUseIdx: number | null,
    activeDialogForMenuUseBoolean: boolean,
    isColorPaletteOpen: boolean,
    colorPaletteCurrentColor: string,
    isHighlightColorPaletteOpen: boolean,
    highlightColorPaletteCurrentColor: string,
    imageUplaodInEditorLoading: boolean,
}

const initialState:ComponentStateType = {
    activeDialogForMenuUseIdx: null,
    activeDialogForMenuUseBoolean: false,
    isColorPaletteOpen: false,
    colorPaletteCurrentColor: "black",
    isHighlightColorPaletteOpen: false,
    highlightColorPaletteCurrentColor: "white",
    imageUplaodInEditorLoading: false,

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
        },
        setIsColorPaletteOpen: ( state, action)=>{
            state.isColorPaletteOpen = action.payload;
        },
        setColorPaletteCurrentColor: ( state, action)=>{
            state.colorPaletteCurrentColor = action.payload;
        },
        setIsHighlightColorPaletteOpen: ( state, action)=>{
            state.isHighlightColorPaletteOpen = action.payload;
        },
        setHighlightColorPaletteCurrentColor: ( state, action)=>{
            state.highlightColorPaletteCurrentColor = action.payload
        },
        setImageUplaodInEditorLoading: ( state, action)=>{
            state.imageUplaodInEditorLoading = action.payload;
        }
        
    }
})

export const { setActiveDialogForMenuUseIdx, setActiveDialogForMenuUseBoolean, setIsColorPaletteOpen, setColorPaletteCurrentColor, setIsHighlightColorPaletteOpen, setHighlightColorPaletteCurrentColor } = documentSlice.actions;

export default documentSlice.reducer;

