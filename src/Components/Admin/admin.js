import React from 'react';
import { getAuth } from "firebase/auth";
import SideBar from './SideBar/sidebar';
import Header from './AdminHeader/adminHeader';
import Footer from './AdminFooter/adminFooter';
import './admin.css';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';

export const auth = getAuth();

export default function Admin() {

    return (
        <Container id="adminWrapper">
            <Header currentEmail={auth.currentUser.email} />
            <Box id="mainPage">
                <SideBar />
                <Box id="pages">
                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </Container>
    )
}