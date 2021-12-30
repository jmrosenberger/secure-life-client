import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createEvent, getEvent, updateEvent } from './EventManager.js'

export const EventForm = () => {
    const history = useHistory()
    const [currentEvent, setCurrentEvent] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { eventId } = useParams()


    const getEventToEdit = () => {
        if (eventId) {
            toggleEditMode(true)
            getEvent(eventId)
                .then(eventData => {
                    setCurrentEvent(eventData)
                })
        } else {
            setCurrentEvent({
                title: "",
                date: Date(),
                notes: ""
            })
        }
    }
    useEffect(() => {
        getEventToEdit()
    }, [eventId])

    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setCurrentEvent(newEventState)
    }


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Event Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                        id="date"
                        placeholder="Choose A Date"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes: </label>
                    <input type="text" name="notes" required autoFocus className="form-control"
                        value={currentEvent.notes}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button onClick={(events) => {
                events.preventDefault()

                const event = {
                    title: currentEvent.title,
                    date: currentEvent.date,
                    notes: currentEvent.notes
                }
                {
                    editMode ?
                        updateEvent(event, eventId)
                            .then(() => { history.push('/events') })
                        : createEvent(event)
                            .then(() => { history.push('/events') })
                }
            }}
                className="btn btn-primary">Save event</button>
        </form>
    )
}
