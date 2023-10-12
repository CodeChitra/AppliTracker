import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
    const { user, isLoading } = useSelector(store => store.user);
    const [userData, setUserData] = useState({
        name: user?.name || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        location: user?.location || ""
    })
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, lastName, email, location } = userData;

        if (!name || !lastName || !email || !location) {
            toast.error("Please fill out all the entries...");
            return;
        }
        else {
            dispatch(updateUser(userData));
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData(prev => ({ ...prev, [name]: value }));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit} className='form'>
                <h3>Profile</h3>
                <div className="form-center">
                    <FormRow
                        type='text'
                        name='name'
                        value={userData.name}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='text'
                        labelText="last name"
                        name='lastName'
                        value={userData.lastName}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={userData.email}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='location'
                        name='location'
                        value={userData.location}
                        handleChange={handleChange}
                    />
                    <button className="btn btn-block" type='submit' disabled={isLoading}>{isLoading ? "Submitting Changes..." : "Save Changes"}</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile
