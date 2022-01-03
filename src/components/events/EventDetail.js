import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getEventImages, uploadEventImage, deleteEvent, deleteEventImage, getEvent } from "./EventManager.js"
import { confirmAlert } from "react-confirm-alert"
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
            .then(setTimeout(() => history.push({ pathname: `/events/details/${eventId}` }), 50))
            .then(setTimeout(() => getImages(), 200))
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
            <div className="event__details">
                <h2>Event Details</h2>
                <section key={`event--${event?.id}`} className="event--details">
                    <div className="event__title">{event?.title}</div>
                    <div className="event__date">Date: {event?.date}</div>
                    <div className="event__notes">Notes: {event?.notes}</div>
                    <div className="btn__group">
                        <button className="btn__edit"
                            onClick={() => {
                                history.push({ pathname: `/events/edit/${event.id}` })
                            }}>Edit Event</button>
                        <button className="btn__delete"
                            onClick={() => {
                                confirmDelete(event.id)
                            }}>Delete Event</button>
                        <button className="btn__return"
                            onClick={() => {
                                history.push({ pathname: `/events` })
                            }}>Return to Events</button>
                    </div>
                    <div className="event__images">
                        <h3>Event Images</h3>
                        <input type="file" id="event_image" onChange={createEventImageString} />
                        <input type="hidden" name="event_id" value={event.id} />
                        <button onClick={createImage}>Upload</button>
                        <div className="eventImages">
                            {eventImages?.map(img => {
                                return <>
                                    <div className="eventImage">
                                        <button className="btn__deleteImage"
                                            onClick={() => {
                                                confirmDeleteImage(img.id)
                                            }}>x</button>
                                        <img src={img?.action_pic} width="100%" alt={`event-${img?.action_pic}`} />
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
