import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteJobThunk, getAllJobsThunk, showStatsThunk } from "./allJobsThunk";

const initialFiltersState = {
    search: "",
    searchStatus: "all",
    searchType: "all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk);

export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);

export const deleteJob = createAsyncThunk("allJobs/deleteJob", deleteJobThunk);
const allJobsSlice = createSlice({
    name: "allJobs",
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        },
        changeAllJobsInput: (state, { payload }) => {
            const { name, value } = payload;
            state[name] = value;
            state.page = 1;
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState };
        },
        changePage: (state, { payload }) => {
            state.page = payload;
        },
        clearAllJobsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => { state.isLoading = true })
            .addCase(getAllJobs.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.jobs = payload.jobs
                state.totalJobs = payload.totalJobs;
                state.numOfPages = payload.numOfPages;
            })
            .addCase(getAllJobs.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(deleteJob.fulfilled, (_, { payload }) => {
                toast.success(payload.msg);
            })
            .addCase(deleteJob.rejected, (_, { payload }) => {
                toast.error(payload)
            })
            .addCase(showStats.pending, (state) => { state.isLoading = true })
            .addCase(showStats.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.stats = payload.defaultStats;
                state.monthlyApplications = payload.monthlyApplications
            })
            .addCase(showStats.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
    }
})

export const { showLoading, hideLoading, changeAllJobsInput, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;
export default allJobsSlice.reducer;