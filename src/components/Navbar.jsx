import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStore, logoutUser, toggleSidebar } from "../features/user/userSlice";

const Navbar = () => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [showLogout, setShowLogout] = useState(false);
    const toggle = () => {
        dispatch(toggleSidebar());
    }
    return (
        <Wrapper>
            <div className="nav-center">
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={toggle}
                >
                    <FaAlignLeft />
                </button>
                <div>
                    <h3 className="logo-text">dashboard</h3>
                </div>
                <div className="btn-container">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setShowLogout(prev => !prev)}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                        <button
                            type="button"
                            className="dropdown-btn"
                            onClick={() => {
                                dispatch(clearStore("Logout Successfull..."))
                            }}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;