import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";
import JobInfo from "./JobInfo";
import { deleteJob } from "../features/allJobs/allJobsSlice";
import { setEditJob } from "../features/job/jobSlice";

const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
}) => {

    const dispatch = useDispatch();
    const date = new Intl.DateTimeFormat('en-US', {
        weekday: "long",
        year: "2-digit",
        day: "numeric",
        month: "long"
    }).format(new Date(createdAt));
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className="actions">
                        <Link
                            to="/add-jobs"
                            className="btn edit-btn"
                            onClick={() => {
                                dispatch(setEditJob({
                                    editJobId: _id,
                                    position,
                                    company,
                                    jobLocation,
                                    jobType,
                                    createdAt,
                                    status,
                                }));
                            }}
                        >
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="btn delete-btn"
                            onClick={() => {
                                dispatch(deleteJob(_id));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Job;