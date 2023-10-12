import customFetch from "../../utils/customFetch";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post("/auth/login", user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}` // This is how server is checking for token -> Bearer <token>
            }
        })
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue("Unauthorized! Logging Out...!");
        }
        toast.error(error.response.data.msg);
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}