import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployees, planTest } from '../func';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';
import { auth } from '../admin';

export default function Employees() {
    const [employees, setListEmployees] = useState(null);
    const [employeeName, setEmployeeName] = useState('');
    const [emmployeeEmail, setEmployeeEmail] = useState('');

    function onCreateClick(event) {
        event.preventDefault();
        createEmployee(employeeName, emmployeeEmail, auth.currentUser.uid).then(res => employees.push(res), setListEmployees(employees));
        setEmployeeEmail('');
        setEmployeeName('');
    }

    useEffect(() => {
        getEmployees().then(res => res.json().then(setListEmployees))
    }, [employees])

    return (
        <div>
            <section>
                <Box component="form" noValidate sx={{ mt: 1 }} id="employeeForm">
                    <Typography component="h1" variant="h5" marginTop="16px">
                        Создайте нового пользователя
                    </Typography>
                    <TextField
                        margin="normal"
                        value={employeeName}
                        required
                        id="employeeName"
                        label="Имя сотрудника"
                        name="employeeName"
                        onChange={(ev) => setEmployeeName(ev.target.value)}
                    />
                    <TextField
                        margin="normal"
                        value={emmployeeEmail}
                        required
                        name="employeeEmail"
                        label="Почта сотрудника"
                        type="email"
                        id="employeeEmail"
                        onChange={(ev) => setEmployeeEmail(ev.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        id="employeeButton"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(event) => onCreateClick(event)}
                    >
                        Создать нового сотрудника
                    </Button>
                </Box>
            </section>
            <List id="employeeList">
                {employees ? employees.map(el => {
                    if (el.adminId === auth.currentUser.uid) {
                        return (<ListItem key={el.email} id="employeeItem">
                            {el.name}
                            <Button variant="contained" onClick={() => planTest(el.name)}>
                                Запланировать
                            </Button>
                        </ListItem>)
                    } else {
                        return null
                    }
                }
                ) : null}
            </List>
        </div>
    )
}