import React from 'react';
import { Typography } from '@mui/material';

export default function Header({ currentEmail }) {
    return (
        <header id="adminHeader">
            <Typography component="h1" variant="h5" id="adminTypography">Вы вошли в систему как {currentEmail}</Typography>
        </header>
    )
}