import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getAdventures } from "./AdventureManager.js"
import './Adventures.css'

export const AdventureList = (props) => {
    const history = useHistory()
    const [adventures, setAdventures] = useState([])
    const { adventureId } = useParams()

    useEffect(() => {
        getAdventures()
            .then(data => setAdventures(data))
    }, [])


    return (
        <article className="adventures">
            <h2>Adventures List</h2>
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/adventures/new" })
                }}
            >Create New Adventure</button>
            {
                adventures.map(adventure => {
                    return <section key={`adventure--${adventure.id}`} className="adventure">
                        <div className="adventure__title">{adventure?.title}</div>
                        <div className="adventure__date">Date: {adventure?.date}</div>
                        <Link to={`adventures/details/${adventure.id}`}>Details</Link>
                    </section>

                }).reverse()
            }

        </article>

    )
}
