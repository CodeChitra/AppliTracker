import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    user: null
}

export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    console.log("Login User: ", user);
})

export const registerUser = createAsyncThunk("user/registerUser", async (user, thunkAPI) => {
    console.log("Register User: ", user);
})

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        login() {
            // login logic
        },
        logout() {
            // logout login
        }
    }
})

export default userSlice.reducer;