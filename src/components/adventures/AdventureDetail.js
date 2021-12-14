import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getAdventures, deleteAdventure, getAdventure } from "./AdventureManager.js"
import { confirmAlert } from "react-confirm-alert"
// import "../ReactConfirmAlert.css"


export const AdventureDetail = () => {
    const { adventureId } = useParams()
    const [adventure, setAdventure] = useState({})
    const history = useHistory()
    // const [adventures, setAdventures] = useState([])

    useEffect(() => {
        getAdventure()
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
            {/* <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/adventures/new" })
                }}
            >Create New Adventure</button> */}
            <section key={`adventure--${adventure?.id}`} className="adventure">
                <div className="adventure__title">{adventure?.title}</div>
                <div className="adventure__date">Date: {adventure?.date}</div>
                <div className="adventure__participants">Participants: {adventure?.human_id}</div>
                <div className="adventure__description">Description: {adventure?.description}</div>
                <Link to={`adventures/${adventure?.id}/edit`}>Edit Adventure</Link>
                <button className="btn__delete"
                    onClick={() => {
                        confirmDelete(adventure.id)
                    }}>Delete Adventure</button>
            </section>


        </>

    )
}
