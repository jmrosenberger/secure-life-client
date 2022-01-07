import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getEvents } from "./EventManager.js"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import './Events.css'

export const EventList = (props) => {
    const history = useHistory()
    const [events, setEvents] = useState([])
    const { eventId } = useParams()

    useEffect(() => {
        getEvents()
            .then(data => setEvents(data))
    }, [])


    return (
        <article className="events__container">
            <Container className="div__eventsList">
                <Typography variant="h3" align='center' className="header__eventList">My Events</Typography>
                <Container className="btn__grouping">
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button className="btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: "/events/new" })
                            }}
                        >Create New Event</Button>
                    </ButtonGroup>
                </Container>
            </Container>
            <Container fluid="sm, md, lg, xl, xxl" className="card__container">
                <Row xs={1} md={3} lg={4} xl={5} className="card__row">
                    {
                        events.map(event => {
                            return <Col className="event card__col" key={`event--${event.id}`}>
                                <Card className="card__card">
                                    <Card.Body className="card__body">
                                        <Card.Title className="event__title">{event?.title}</Card.Title>
                                        <Card.Text className="event__date">Date: {event?.date}</Card.Text>
                                        <Link to={`events/details/${event.id}`}>Details</Link>
                                    </Card.Body>
                                </Card>
                            </Col>

                        }).reverse()
                    }
                </Row>
            </Container>
        </article>
    )
}
