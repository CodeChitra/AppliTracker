import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import NavLinks from './NavLinks';
const BigSidebar = () => {
    const { isSidebarOpen } = useSelector(store => store.user);
    // by default sidebar is closed but if you want to change this behavious then you can just filp the condtion with ternary operator
    return (
        <Wrapper>
            <div className={isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar
