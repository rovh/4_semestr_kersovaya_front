import React from 'react';
import {CircularProgress, Container} from "@mui/material";

const Loader = () => {
    return (
        <Container style={{textAlign: 'center', marginTop: '100px'}}>
            <CircularProgress color="success"/>
        </Container>
    );
};

export default Loader;