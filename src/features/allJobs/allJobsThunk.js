import customFetch, { checkForUnauthorizedResponse } from "../../utils/customFetch";
import { getAllJobs, hideLoading, showLoading } from "./allJobsSlice";
export const getAllJobsThunk = async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

    if (search)
        url += `&search=${search}`;
    try {
        const resp = await customFetch.get(url);
        return resp.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
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
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const showStatsThunk = async (_, thunkAPI) => {
    try {
        const resp = await customFetch.get("/jobs/stats");
        return resp.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}