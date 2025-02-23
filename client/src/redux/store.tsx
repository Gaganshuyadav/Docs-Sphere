import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import documentReducer from "./Slices/documentSlice";
import componentReducer from "./Slices/componentSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        document: documentReducer,
        component: componentReducer,
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;

