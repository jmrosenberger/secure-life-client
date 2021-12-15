import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getLocations, deleteLocation, getLocation } from "./LocationManager.js"
import { confirmAlert } from "react-confirm-alert"
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
            <h2>Location Details</h2>
            <section key={`location--${location.id}`} className="location">
                <div className="location__city">{location.city}</div>
                <div className="location__park">Date: {location.park}</div>
                <button className="btn__edit"
                    onClick={() => {
                        history.push({ pathname: `/locations/edit/${location.id}`})
                    }}>Edit Location</button>
                <button className="btn__delete"
                    onClick={() => {
                        confirmDelete(location.id)
                    }}>Remove Location</button>
            </section>


        </>

    )
}
