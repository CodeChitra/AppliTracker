import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, editJobThunk } from "./jobThunk";

const initialState = {
    isLoading: false,
    position: "",
    company: "",
    jobLocation: "",
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["interview", "declined", "pending"],
    status: "pending",
    isEditing: false,
    editJobId: "",
};


export const createJob = createAsyncThunk("job/createJob", createJobThunk)

export const editJob = createAsyncThunk("job/editJob", editJobThunk)

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        changeInput: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: () => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || ""
            }
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => { state.isLoading = true })
            .addCase(createJob.fulfilled, (state) => {
                state.isLoading = false;
                toast.success("Job created!");
            })
            .addCase(createJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(editJob.pending, (state) => { state.isLoading = true })
            .addCase(editJob.fulfilled, (state) => {
                state.isLoading = false;
                toast.success("Job Updated!");
            })
            .addCase(editJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })

    }
})

export const { changeInput, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;