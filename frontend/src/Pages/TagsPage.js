import React, {useEffect, useState} from 'react';
import {Container, Typography, Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import Loader from "../Component/Loader";

const TagsPage = () => {
    const [tags, setTags] = useState()
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoad(true)
        axios.get(`${process.env.REACT_APP_API}/api/tag/`)
            .then(res => res.data)
            .then(data => {
                setTags(data?.results)
                setTimeout(() => setLoad(false), 1000)
            })
            .catch(() => setErr(true))
    }, [])

    if (load) return <Loader />

    if (err) return <Container><Typography align="center">Server error</Typography></Container>

    return (
        <Container>
            <Typography variant="h3" align="center">Метки статей</Typography>
            {tags?.map(tag => (
                <Accordion key={tag.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
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
        </Container>
    );
};

export default TagsPage;