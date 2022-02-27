import { List, ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    function handleLogOut() {
        logOut();
        navigate('http://Ezzhevichka.github.io/itechart-deploy-test/login')
    }

    return (
        <section id="sidebar">
            <List component="nav">
                <ListItem button>
                    <NavLink id="navLink" exact to="http://Ezzhevichka.github.io/itechart-deploy-test/admin/employees" activeClassName="active">
                        <ListItemText primary="Сотрудники" />
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <NavLink id="navLink" exact to="http://Ezzhevichka.github.io/itechart-deploy-test/admin/admins" activeClassName="active">
                        <ListItemText primary="Администраторы" />
                    </NavLink>
                </ListItem>
            </List>
            <Divider />
            <List component="nav">
                <Button id="signout"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => handleLogOut()}
                >
                    Выйти
                </Button>
            </List>
        </section>
    )
}