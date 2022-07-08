import * as React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,
} from "@mui/material";
import {Link} from 'react-router-dom'
import {observer} from "mobx-react-lite";

const Navibar = observer(() => {

    const routes = [
        {name: 'Теги', link: '/'},
        {name: 'Новости', link: '/news'},
        {name: 'Категории', link: '/categories'},
    ]

    return (
        <AppBar position="static" style={{marginBottom: '50px'}} color="secondary">
            <Container maxWidth="lg">
                <Toolbar disableGutters>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {xs: "none", md: "flex"},
                        }}
                    >
                        {routes.map((route) => (
                            <Button
                                key={route.link}
                                component={Link}
                                to={route.link}
                                sx={{my: 2, color: "white", display: "block"}}
                            >
                                {route.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
});
export default Navibar;
