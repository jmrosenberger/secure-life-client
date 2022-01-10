import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getEventImages, uploadEventImage, deleteEvent, deleteEventImage, getEvent } from "./EventManager.js"
import { confirmAlert } from "react-confirm-alert"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from "react-bootstrap/Image"
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FilledInput from '@mui/material/FilledInput'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import "../react-confirm-alert.css"
import "./EventDetail.css"


export const EventDetail = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState({})
    const history = useHistory()
    const [eventImage, setEventImage] = useState("")
    const [eventImages, setEventImages] = useState([])

    useEffect(() => {
        if (eventId) {
            getEvent(eventId)
                .then(data => setEvent(data))
            getImages()
        }
    }, [eventId])

    const getImages = () => {
        getEventImages(eventId)
            .then(images => setEventImages(images))
    }

    const deleteSingleEvent = (eventId) => {
        deleteEvent(eventId)
            .then(setTimeout(() => history.push({ pathname: "/events" }), 200))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this event?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteSingleEvent(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }]
        })
    }

    const deleteImage = (imageId) => {
        deleteEventImage(imageId)
            .then(setTimeout(() => history.push({ pathname: `/events/details/${eventId}` }), 200))
            .then(setTimeout(() => getImages(), 350))
    }

    const confirmDeleteImage = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this image?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteImage(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }]
        })
    }


    // File reader that converts image data to Base64
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    // Call file reader function and converts Base64 to string and saves it as a variable
    const createEventImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            // Update a component state variable to the value of base64ImageString
            setEventImage(base64ImageString)
        })
    }

    const createImage = () => {
        const image = {
            event_id: parseInt(eventId),
            action_pic: eventImage
        }
        uploadEventImage(image)
            .then(getImages)
    }

    console.log(event)

    return (
        <>
            <Container className="event__details">
                <Typography variant="h2" className="header__event" align="center">Event Details</Typography>
                <Card key={`event--${event?.id}`} className="event--details bg-light container__card">
                    <Card.Body>
                        <Card.Title className="event__title">
                            <Typography variant="h5" className="event__header">{event?.title}</Typography>
                        </Card.Title>
                        <Card.Text className="event__date">Date: {event?.date}</Card.Text>
                        <Card.Text className="event__notes">Notes: {event?.notes}</Card.Text>
                        <ButtonGroup className="btn__group">
                            <Button className="btn__edit"
                                onClick={() => {
                                    history.push({ pathname: `/events/edit/${event.id}` })
                                }}>Edit Event</Button>
                            <Button className="btn__delete"
                                onClick={() => {
                                    confirmDelete(event.id)
                                }}>Delete Event</Button>
                            <Button className="btn__return"
                                onClick={() => {
                                    history.push({ pathname: `/events` })
                                }}>Return to Events</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="container__images">
                <Typography variant="h4" className="header__event" align="center">Event Images</Typography>
                <ImageList variant="masonry" cols={3} gap={8} className="images__list">
                    <FilledInput type="file" id="event_image" onChange={createEventImageString} />
                    <FilledInput type="hidden" name="event_id" />
                    <Button onClick={createImage}>Upload</Button>
                        {eventImages?.map(img => {
                            return <>
                                <ImageListItem className="eventImages">
                                    <Button className="btn__deleteImage"
                                        onClick={() => {
                                            confirmDeleteImage(img.id)
                                        }}>x</Button>
                                    <Image src={img?.action_pic} width="100%" alt={`event-${img?.action_pic}`} />
                                </ImageListItem>
                            </>
                        }).reverse()}
                </ImageList>
            </Container>
        </>
    )
}
