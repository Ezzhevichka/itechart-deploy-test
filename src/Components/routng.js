import React, { Fragment } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from './main';
import Admin from './Admin/admin';
import { AuthProvieder } from './Admin/AuthContext';
import SignIn from './Admin/LoginPage/loginPage'
import Employees from './Admin/Employees/employees';
import Admins from './Admin/Admins/admins';
import PrivateRoute from './Admin/privateRoute'

export default function Routing() {
    return (
        <BrowserRouter>
            <Fragment>
                <AuthProvieder>
                    <Routes>
                        <Route exact path="/itechart-deploy-test/" element={<Main />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route exact path="/admin" element={<PrivateRoute />}>
                            <Route exact path="/admin" element={<Admin />}>
                                <Route exact path="/admin/employees" element={<PrivateRoute />}>
                                    <Route exact path="/admin/employees" element={<Employees />} />
                                </Route>
                                <Route exact path="/admin/admins" element={<PrivateRoute />}>
                                    <Route exact path="/admin/admins" element={<Admins />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvieder>
            </Fragment>
        </BrowserRouter>
    )
}