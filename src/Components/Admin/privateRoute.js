import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Admin from './admin';
import { useAuth } from './AuthContext';

export default function PrivateRoute() {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/itechart-deploy-test/login" />
}