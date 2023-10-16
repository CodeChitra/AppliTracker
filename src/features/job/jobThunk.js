import customFetch from "../../utils/customFetch";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
    try {
        const resp = customFetch.post("/jobs", job)

        thunkAPI.dispatch(clearValues())
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue("Unautorized! Logging out...")
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
    try {

        const resp = await customFetch.patch(`/jobs/${jobId}`, job)
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue("Unautorized! Logging out...")
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}