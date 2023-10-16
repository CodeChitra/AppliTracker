import customFetch from "../../utils/customFetch";
import { getAllJobs, hideLoading, showLoading } from "./allJobsSlice";
export const getAllJobsThunk = async (_, thunkAPI) => {
    let url = `/jobs`;
    try {
        const resp = await customFetch.get(url)
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error");
    }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {

        const resp = await customFetch.delete(`jobs/${jobId}`)
        thunkAPI.dispatch(getAllJobs());
        return resp.data;
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}