import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../utils/config.tsx";

class UserThunks{

    public getUserInformation = createAsyncThunk("/user/get", async( id:string, { rejectWithValue})=>{
        try{
            const accessToken = localStorage.getItem("google-docs-access-token");
            const { data} = await axios.get(`${server}/user/${id}`, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}`}});
            return data;
        }
        catch(err:any ){
            if(err.response.data){
                return rejectWithValue({ message: err.response.data.message});
            }
            else{
                return rejectWithValue({ message: err.message});
            }
        }
    })

}

export default new UserThunks();