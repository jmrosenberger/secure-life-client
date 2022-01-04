import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getEvents } from "./EventManager.js"
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
            <h2>Events List</h2>
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Create New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event?.title}</div>
                        <div className="event__date">Date: {event?.date}</div>
                        <Link to={`events/details/${event.id}`}>Details</Link>
                    </section>

                }).reverse()
            }

        </article>

    )
}
