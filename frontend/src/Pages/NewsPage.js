import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Typography,
    Grid,
    Pagination,
    PaginationItem,
    Button
} from "@mui/material";
import {Link, useSearchParams} from 'react-router-dom'
import axios from "axios";
import Loader from "../Component/Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import News from "../news";

const NewsPage = () => {
    const [news, setNews] = useState()
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState(false)
    const [count, setCount] = React.useState()
    let [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState(null)
    const [visibleNews, setVisibleNews] = useState([])
    const [hiddenNews, setHiddenNews] = useState([])

    useEffect(() => {
        setLoad(true)
        axios.get(`${process.env.REACT_APP_API}/api/article/${searchParams.get('page') ? `?limit=5&offset=${searchParams.get('page') * 5 - 5}` : ''}`)
            .then(res => res.data)
            .then(data => {
                setNews(data?.results)
                News.setNews(data?.results)
                setCount(data?.count)
                let visib = []
                let hid = []
                data?.results.map((news_part) => {
                    if (news_part?.visible) {
                        visib.push(news_part)
                    } else {
                        hid.push(news_part)
                    }
                })
                setVisibleNews(visib)
                setHiddenNews(hid)
                setTimeout(() => setLoad(false), 1000)
            })
            .catch(() => setErr(true))
    }, [searchParams])

    if (load) return <Loader/>

    if (err) return <Container><Typography align="center">Server error</Typography></Container>

    return (
        <Container>
            <Typography variant="h2" textAlign="center" gutterBottom>Новости</Typography>

            <Button onClick={() => setFilter(null)}>Все</Button>
            <Button onClick={() => setFilter('hidden')}>Скрытые</Button>
            <Button onClick={() => setFilter('visible')}>Видимые</Button>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{marginBottom: "20px"}}
            >
                <Pagination count={Math.floor(count / 5) + 1}
                            defaultPage={searchParams.get('page') ? parseInt(searchParams.get('page')) : 1}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/news${item.page === 1 ? '' : `?page=${item.page}`}`}
                                    {...item}
                                />
                            )}
                />
            </Grid>

            {filter !== null
                ? filter === 'visible'
                    ? visibleNews.map(art => (
                        <Accordion key={art.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{art.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {art.text}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                    : hiddenNews.map(art => (
                        <Accordion key={art.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{art.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {art.text}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                :
                News.getNews().map(art => (
                    <Accordion key={art.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{art.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {art.text}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </Container>
    );
};

export default NewsPage;