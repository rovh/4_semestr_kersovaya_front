import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    TextField,
    Button
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import Loader from "../Component/Loader";

const CategoryPage = () => {
    const [cats, setCats] = useState()
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState(false)
    const [titleErr, setTitleErr] = useState(false)
    const [textErr, setTextErr] = useState(false)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (title.length < 1)
            setTitleErr(true)
        else
            setTitleErr(false)
        if (text.length < 1)
            setTextErr(true)
        else
            setTextErr(false)

        if (title.length < 1 || text.length < 1) {

        } else {
            axios.post(`${process.env.REACT_APP_API}/api/category/`, {
                name: title, description: text
            }, {
                method: "POST", headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.data)
                .then(data => {
                    setText('')
                    setTitle('')
                    fetchData()
                })
        }
    }

    const fetchData = () => {
        setLoad(true)
        axios.get(`${process.env.REACT_APP_API}/api/category/`)
            .then(res => res.data)
            .then(data => {
                setCats(data?.results)
                setTimeout(() => setLoad(false), 1000)
            })
            .catch(() => setErr(true))
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (load) return <Loader/>

    if (err) return <Container><Typography align="center">Server error</Typography></Container>

    return (
        <Container>
            <Typography variant="h3" align="center">Категории статей</Typography>
            {cats?.map(tag => (
                <Accordion key={tag.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{tag.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {tag.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Добавить статью
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        error={titleErr}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="text"
                        label="Text"
                        type="text"
                        id="text"
                        error={textErr}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Добавить
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CategoryPage;