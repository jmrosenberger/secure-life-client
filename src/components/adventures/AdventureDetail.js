import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getAdventures, deleteAdventure, getAdventure } from "./AdventureManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../react-confirm-alert.css"


export const AdventureDetail = () => {
    const { adventureId } = useParams()
    const [adventure, setAdventure] = useState({})
    const history = useHistory()
    // const [adventures, setAdventures] = useState([])

    useEffect(() => {
        getAdventure(adventureId)
            .then(data => setAdventure(data))
    }, [adventureId])

    const deleteSingleAdventure = (adventureId) => {
        deleteAdventure(adventureId)
            // .then(() => {
            //     getAdventures()
            //         .then((adventureList) => {
            //             setAdventures(adventureList)
            //         })
            // })
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
        <>
            <h2>Adventure Details</h2>
            <section key={`adventure--${adventure?.id}`} className="adventure">
                <div className="adventure__title">{adventure?.title}</div>
                <div className="adventure__date">Date: {adventure?.date}</div>
                <div className="adventure__participants">Participants: *(THIS SECTION SHOULD RETURN A LIST OF HUMANS RENDERED FROM FORM) {adventure?.human_id}</div>
                <div className="adventure__description">Description: {adventure?.description}</div>
                <div className="adventure__images">IMAGES: NEED TO ADD IMAGES (LINK OR CAROUSEL)...</div>
                <button className="btn__edit"
                    onClick={() => {
                        history.push({ pathname: `/adventures/edit/${adventure.id}`})
                    }}>Edit Adventure</button>
                <button className="btn__delete"
                    onClick={() => {
                        confirmDelete(adventure.id)
                    }}>Delete Adventure</button>
            </section>


        </>

    )
}
