import { createSlice } from "@reduxjs/toolkit";
import userThunks from "../thunks/user.tsx";
import { jwtDecode} from "jwt-decode";
import { UserStateType } from "../../vite-env";
import { UserType } from "../../types/interfaces/UserType.ts";


const initialState:UserStateType = {
    isUserLoading: false,
    isAuthenticated: false, 
    user: null,
    accessToken: "",
    refreshToken: "",
    errors: [],
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        setLoginAuth: ( state, action)=>{

            state.isUserLoading = false;

            //store access token in state and in localstorage
            state.accessToken = action.payload.authResponse.accessToken;
            state.refreshToken = action.payload.authResponse.refreshToken;

            //get user data from access token
            const { email, id, exp, roles}:UserType = jwtDecode<UserType>(action.payload.authResponse.accessToken);
            state.user = { email, id, exp, roles};

            //isAuthenticated 
            state.isAuthenticated = true;
                      
        },

        destroyAuth: ( state)=>{

            state.isUserLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = "";
            state.refreshToken = "";

        },
        setIsUserLoading: ( state, action)=>{
            state.isUserLoading = action.payload;
        }
    },
    extraReducers: (builder)=>{


        //get user information
        builder.addCase( userThunks.getUserInformation.pending, ( state)=>{
            state.isUserLoading = true;
        }),
        builder.addCase( userThunks.getUserInformation.fulfilled, ( state)=>{
            state.isUserLoading = false;
        }),
        builder.addCase( userThunks.getUserInformation.rejected, ( state)=>{
            state.isUserLoading = false;
        })

    }
})


export const { destroyAuth, setLoginAuth, setIsUserLoading} = userSlice.actions;

export default userSlice.reducer;
