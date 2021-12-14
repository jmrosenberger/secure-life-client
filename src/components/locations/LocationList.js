import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getLocations, deleteLocation, getLocation } from "./LocationManager.js"
import { confirmAlert } from "react-confirm-alert"
// import "../ReactConfirmAlert.css"
import './Locations.css'

export const LocationList = (props) => {
    const history = useHistory()
    const [locations, setLocations] = useState([])
    const { locationId } = useParams()

    useEffect(() => {
        getLocations()
            .then(data => setLocations(data))
    }, [])

    const deleteSingleLocation = (locationId) => {
        deleteLocation(locationId)
            .then(() => {
                getLocations()
                    .then((locationList) => {
                        setLocations(locationList)
                    })
            })
            .then(history.push({ pathname: "/locations" }))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this location?',
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
        <article className="locations">
            <h2 className="places_visited">Places I've Been</h2>
            <h2 className="bucket_list">Bucket List</h2>
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/locations/new" })
                }}
            >Add New Location</button>
            {
                locations.map(location => {
                    return <section key={`location--${location.id}`} className="location">
                        <div className="location__city">Name of City: {location?.city.name}</div>
                        <div className="location__park">Name of Park: {location?.park.name}</div>
                        <Link to={`locations/edit/${location.id} className="link__edit"`}>Edit location</Link>
                        <button className="btn__delete"
                            onClick={() => {
                                confirmDelete(location.id)
                            }}>Delete Location</button>
                    </section>

                }).reverse()
            }

        </article>

    )
}
