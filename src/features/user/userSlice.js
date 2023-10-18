import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage, removeUserFromLocalStorage, setUserToLocalStorage } from "../../utils/localStorage";
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";
const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage()
}

export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
})

export const registerUser = createAsyncThunk("user/registerUser", async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
})

export const updateUser = createAsyncThunk("user/updateUser", async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
})

export const clearStore = createAsyncThunk("user/clearStore", (message, thunkAPI) => {
    return clearStoreThunk(message, thunkAPI);
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },

        logoutUser: (state, { payload }) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
            if (payload)
                toast.success(payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, state => { state.isLoading = true })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload?.user;
                setUserToLocalStorage(payload?.user);
                toast.success(`Hello there ${payload.user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => { state.isLoading = false; toast.error(payload) })
            .addCase(loginUser.pending, state => { state.isLoading = true })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload?.user;
                setUserToLocalStorage(payload?.user);
                toast.success(`Welcome back ${payload?.user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(updateUser.pending, (state) => { state.isLoading = true })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                setUserToLocalStorage(user);
                toast.success(`User Updated: ${user.name}`)
            })
            .addCase(updateUser.rejected, (state, { payload }) => { state.isLoading = false; toast.error(payload) })
            .addCase(clearStore.rejected, (_, _2) => { toast.error("There was an error") });
    }
})

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;