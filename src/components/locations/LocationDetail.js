import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getLocations, deleteLocation, getLocation } from "./LocationManager.js"
import { confirmAlert } from "react-confirm-alert"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import "./LocationDetail.css"
import "../react-confirm-alert.css"


export const LocationDetail = () => {
    const { locationId } = useParams()
    const [location, setLocation] = useState({})
    const history = useHistory()

    useEffect(() => {
        getLocation(locationId)
            .then(data => setLocation(data))
    }, [locationId])

    const deleteSingleLocation = (locationId) => {
        deleteLocation(locationId)
            // .then(() => {
            //     getAdventures()
            //         .then((adventureList) => {
            //             setAdventures(adventureList)
            //         })
            // })
            .then(history.push({ pathname: "/locations" }))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this adventure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteSingleLocation(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }
            ]
        })
    }

    return (
        <>
            <Container key={`location--${location.id}`} className="location__detail">
                <Row className="justify-content-md-center">
                    <Card key={`location--${location?.id}`} body className="text-center container__card">
                        <Card.Body>
                            <Card.Title className="location__park">{location.park}</Card.Title>
                            <Card.Text className="location__city">{location.city}, {location.state}</Card.Text>
                            <ButtonGroup>
                            <Button className="btn__edit"
                                onClick={() => {
                                    history.push({ pathname: `/locations/edit/${location.id}` })
                                }}>Edit Location</Button>
                            <Button className="btn__delete"
                                onClick={() => {
                                    confirmDelete(location.id)
                                }}>Remove Location</Button>
                            <Button className="btn__return"
                                onClick={() => {
                                    history.push({ pathname: `/locations` })
                                }}>Return To Locations</Button>
                                </ButtonGroup>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>


        </>

    )
}
