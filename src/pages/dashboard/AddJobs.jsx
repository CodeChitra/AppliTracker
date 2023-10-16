import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { changeInput, clearValues, createJob, editJob } from "../../features/job/jobSlice";
import { useEffect } from "react";

const AddJob = () => {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId,
    } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            toast.error("Please Fill Out All Fields");
            return;
        }

        if (isEditing) {
            dispatch(editJob({ jobId: editJobId, job: { position, company, jobLocation, status, jobType } }));
            return;
        }
        dispatch(createJob({ position, company, jobLocation, status, jobType }));
    };
    const handleJobInput = (e) => {
        const { name, value } = e.target;

        dispatch(changeInput({ name, value }));
    };

    useEffect(() => {
        if (!isEditing)
            dispatch(changeInput({ name: "jobLocation", value: user?.location }))
    }, [])

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "edit job" : "add job"}</h3>

                <div className="form-center">
                    {/* position */}
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormRow
                        type="text"
                        labelText="job location"
                        name="jobLocation"
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    {/* job status */}
                    <FormRowSelect
                        name="status"
                        list={statusOptions}
                        value={status}
                        handleChange={handleJobInput}
                    />

                    {/* job type */}

                    <FormRowSelect
                        name="jobType"
                        labelText="job type"
                        list={jobTypeOptions}
                        value={jobType}
                        handleChange={handleJobInput}
                    />
                    {/* btn container */}
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-block clear-btn"
                            onClick={() => dispatch(clearValues())}
                        >
                            clear
                        </button>
                        <button
                            type="submit"
                            className="btn btn-block submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Job..." : "submit"}
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
