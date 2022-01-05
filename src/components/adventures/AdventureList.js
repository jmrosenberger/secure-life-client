import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getAdventures, getImages } from "./AdventureManager.js"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import './AdventuresList.css'

export const AdventureList = (props) => {
    const history = useHistory()
    const [adventures, setAdventures] = useState([])
    const [images, setImages] = useState([])
    const { adventureId } = useParams()

    useEffect(() => {
        getAdventures()
            .then(data => setAdventures(data))
    }, [])


    useEffect(() => {
        getImages()
            .then(data => setImages(data))
    }, [])

    return (
        <article className="container__adventuresList">
            <div className="div__adventuresList">
                <Typography variant="h1" align='center' className="header__adventuresList">My Adventures</Typography>
                <div className="btn__grouping">
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button className="btn btn-primary"
                            onClick={() => {
                                history.push({ pathname: "/adventures/new" })
                            }}
                        >Create Adventure</Button>
                        <Button className="btn btn-primary"
                            onClick={() => {
                                history.push({ pathname: "/locations" })
                            }}
                        >My Locations</Button>
                    </ButtonGroup>
                </div>
            </div>
            <Container fluid="sm, md, lg, xl, xxl" className="card__container">
                <Row xs={1} md={3} lg={4} xl={5} className="card__row">
                    {adventures.map((adventure) => (
                        <Col className="adventure card__col" key={`adventure--${adventure.id}`}>
                            <Card className="card__card">
                                <Card.Img variant="top" src='' />
                                <Card.Body className="card__body">
                                    <Card.Title as="h3" className="adventure__title card__title">{adventure?.title}</Card.Title>
                                    <Card.Text className="adventure__date card__text">
                                        {adventure?.date}
                                    </Card.Text>
                                    <Link to={`adventures/details/${adventure.id}`} className="card__link">Details</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )).reverse()}
                </Row>
            </Container>
            {/* <Row xs={1} md={2} lg={3} className="g-4">
                {images.map((img) => (
                    <Col className="adventure" key={`adventure--${img.adventure.id}`}>
                        <Card>
                            <Card.Img variant="top" src={img.action_pic} size={`100px`}  className="img-fluid" />
                            <Card.Body>
                                <Card.Title className="adventure__title">{img.adventure?.title}</Card.Title>
                                <Card.Text className="adventure__date">
                                    {img.adventure?.date}
                                </Card.Text>
                                <Link to={`adventures/details/${img.adventure.id}`}>Details</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> */}

        </article>

    )
}
