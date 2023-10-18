import customFetch from "../../utils/customFetch";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
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
        const resp = await customFetch.patch(url, user)
        return resp.data;
    } catch (error) {
        toast.error(error.response.data.msg);
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const clearStoreThunk = async (message, thunkAPI) => {
    try {
        // logout user
        thunkAPI.dispatch(logoutUser(message));
        // clear jobs value
        thunkAPI.dispatch(clearAllJobsState());
        // clear job input values
        thunkAPI.dispatch(clearValues());
        return Promise.resolve();
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
};