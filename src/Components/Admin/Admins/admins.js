import React, { useState, useEffect } from 'react';
import { getAdmins } from '../func';
import { createAdmin } from '../func';
import { Box, TextField, Typography, Button, List, ListItem, ListItemText } from '@mui/material'
import { useAuth } from '../AuthContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteUser } from '../func';

export default function Admins() {
    const [admins, setListAdmins] = useState(null);
    const [adminEmail, setAdminEmail] = useState('');

    const { currentUser } = useAuth();

    function onCreateClick(event) {
        event.preventDefault();
        createAdmin(adminEmail).then(res => admins.push(res), setListAdmins(admins))
        setAdminEmail('')
    }

    function onDeleteClick(uid) {
        deleteUser(uid).then((res) => {
            if (res) {
                setListAdmins(admins.filter(el => el.uid !== uid))
            }
        })
    }

    useEffect(() => {
        getAdmins().then(res => res.json().then(setListAdmins))
    }, [admins])

    return (
        <div>
            <section>
                <Box component="form" noValidate sx={{ mt: 1 }} id="adminsForm">
                    <Typography component="h1" variant="h5" marginTop="16px">
                        Создайте нового администратора
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        name="adminEmail"
                        label="Почта администратора"
                        type="email"
                        id="adminEmail"
                        value={adminEmail}
                        onChange={(ev) => setAdminEmail(ev.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        id="adminsButton"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(event) => onCreateClick(event)}
                    >
                        Создать нового администратора
                    </Button>
                </Box>
            </section>
            <List>
                {admins ? admins.map(el => {
                    if (el.uid === currentUser.uid) {
                        return null
                    } else {
                        return (
                            <ListItem disablePadding id="adminList">
                                <ListItemText primary={el.email} />
                                <DeleteForeverIcon id="trashButton" onClick={() => onDeleteClick(el.uid)} />
                            </ListItem>
                        )
                    }
                })
                    :
                    null}
            </List>
        </div>
    )
}