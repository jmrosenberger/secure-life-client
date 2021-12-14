import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getAdventures, deleteAdventure, getAdventure } from "./AdventureManager.js"
import { confirmAlert } from "react-confirm-alert"
// import "../ReactConfirmAlert.css"
import './Adventures.css'

export const AdventureList = (props) => {
    const history = useHistory()
    const [adventures, setAdventures] = useState([])
    const { adventureId } = useParams()

    useEffect(() => {
        getAdventures()
            .then(data => setAdventures(data))
    }, [])

    const deleteSingleAdventure = (adventureId) => {
        deleteAdventure(adventureId)
            .then(() => {
                getAdventures()
                    .then((adventureList) => {
                        setAdventures(adventureList)
                    })
            })
            .then(history.push({ pathname: "/adventures" }))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this adventure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteSingleAdventure(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }
            ]
        })
    }

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
