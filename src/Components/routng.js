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
                        <Route exact path="http://Ezzhevichka.github.io/itechart-deploy-test/itechart-deploy-test" element={<Main />} />
                        <Route path="http://Ezzhevichka.github.io/itechart-deploy-test/login" element={<SignIn />} />
                        <Route exact path="http://Ezzhevichka.github.io/itechart-deploy-test/admin" element={<PrivateRoute />}>
                            <Route exact path="http://Ezzhevichka.github.io/itechart-deploy-test/admin" element={<Admin />}>
                                <Route exact path="http://Ezzhevichka.github.io/itechart-deploy-test/admin/employees" element={<PrivateRoute />}>
                                    <Route exact path="http://Ezzhevichka.github.io/itechart-deploy-test/admin/employees" element={<Employees />} />
                                </Route>
                                <Route exact path="http://Ezzhevichka.github.io/itechart-deploy-test/admin/admins" element={<PrivateRoute />}>
                                    <Route exact path="http://Ezzhevichka.github.io/itechart-deploy-test/admin/admins" element={<Admins />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvieder>
            </Fragment>
        </BrowserRouter>
    )
}