import React from 'react'
import { useState, useEffect } from "react";
import { Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from '../components/FormRow';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const { name, email, password, isMember } = values;
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill out all the fields!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            if (isMember) {
                dispatch(loginUser({ email, password }));
            }
            else {
                dispatch(registerUser({ name, email, password }))
            }
        }
    }

    const toggleMember = () => setValues(prev => {
        return {
            ...prev,
            isMember: !prev.isMember
        }
    })

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={handleSubmit}>
                <Logo />
                <h3>{isMember ? "Login" : "Register"}</h3>

                {isMember || <FormRow
                    type="text"
                    value={name}
                    name="name"
                    handleChange={handleChange}
                />}
                <FormRow
                    type="email"
                    value={email}
                    name="email"
                    handleChange={handleChange}
                />
                <FormRow
                    type="password"
                    value={password}
                    name="password"
                    handleChange={handleChange}
                />
                <button type="submit" className="btn btn-block">
                    submit
                </button>
                <p>
                    {values.isMember ? "Not a member yet?" : "Already a member?"}

                    <button type="button" onClick={toggleMember} className="member-btn">
                        {isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
