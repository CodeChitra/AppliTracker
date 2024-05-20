import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.user);
    //Here we can not use useNavigate() Hook becasue we have to render a component here
    
    if (!user) {
        return <Navigate to="/landing" />
    }
    return (
        children
    )
}

export default ProtectedRoute;
