import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getLocations } from "./LocationManager.js"
import { getAdventures } from "../adventures/AdventureManager.js"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import './Locations.css'

export const LocationList = (props) => {
    const history = useHistory()
    const [locations, setLocations] = useState([])
    const { locationId } = useParams()
    const [adventures, setAdventures] = useState([])

    useEffect(() => {
        getLocations()
            .then(data => setLocations(data))
    }, [])
    useEffect(() => {
        getAdventures()
            .then(data => setAdventures(data))
    }, [])

    const visitedLocations = (location) => {
        for (location of locations) {
            adventures.map(adventure => {
                if (adventure.location.id === location.id) {
                    location.is_visited = true
                }
            })
        }
    }

    visitedLocations()

    return (
        <Container className="locations__container">
            <Container className="div__locationList">
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button className="btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/locations/new" })
                        }}
                    >Add New Location To Bucket List</Button>
                </ButtonGroup>
            </Container>
            <Typography variant="h3" align='center' className="header__locationList">Places I've Been</Typography>
            <Container className="main__body">
                <Container fluid="sm, md, lg, xl, xxl" className="card__container">
                    <Row xs={1} md={3} lg={4} xl={5} className="card__row">
                        {
                            locations.map(location => {
                                if (location.is_visited === true) {
                                    return <Col key={`location--${location.id}`} className="location">
                                        <Card className="card__card">
                                            <Card.Body className="card__body">
                                                <Card.Title className="location__park">{location?.park}</Card.Title>
                                                <Card.Text className="location__city">{location?.city}, {location?.state}</Card.Text>
                                                <Link to={`locations/details/${location.id}`}>Location Details</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                }
                            })
                        }
                    </Row>
                </Container>
            </Container>
            <hr></hr>
            <Typography variant="h3" align='center' className="header__locationList">Bucket List</Typography>
            <Container>
                <Container fluid="sm, md, lg, xl, xxl" className="card__container">
                    <Row xs={1} md={3} lg={4} xl={5} className="card__row">
                        {
                            locations.map(location => {
                                if (location.is_visited !== true) {
                                    return <Col key={`location--${location.id}`} className="location">
                                        <Card className="card__card">
                                            <Card.Body className="card__body">
                                                <Card.Title className="location__park">{location?.park}</Card.Title>
                                                <Card.Text className="location__city">{location?.city}, {location?.state}</Card.Text>
                                                <Link to={`locations/details/${location.id}`}>Location Details</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                }
                            })
                        }
                    </Row>
                </Container>
            </Container>
        </Container>
    )
}
