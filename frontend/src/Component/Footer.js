import { Container, Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
    return (
        <Box
            bgcolor='#9c27b0'
            color='white'
            sx={{ position: 'fixed', bottom: 0, width: '100%' }}
        >
            <Container>
                <Typography variant="h6" textAlign='center'>Колотилин Алексей</Typography>
            </Container>
        </Box>
    )
}

export default Footer
