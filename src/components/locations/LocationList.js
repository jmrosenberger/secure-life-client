import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getLocations } from "./LocationManager.js"
import { getAdventures } from "../adventures/AdventureManager.js"
import './Locations.css'

export const LocationList = (props) => {
    const history = useHistory()
    const [locations, setLocations] = useState([])
    const { locationId } = useParams()
    const [adventures, setAdventures] = useState([])

    useEffect(() => {
        getLocations()
            .then(data => setLocations(data))
    }, [])
    useEffect(() => {
        getAdventures()
            .then(data => setAdventures(data))
    }, [])

    const visitedLocations = (location) => {
        for(location of locations){
            adventures.map(adventure => {
                if (adventure.location.id === location.id){
                    location.is_visited = true
                }
            })
        }
    }

    visitedLocations()

    return (
        <article className="locations">
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/locations/new" })
                }}
            >Add New Location To Bucket List</button>

            <h2 className="places_visited">Places I've Been</h2>
            {
                locations.map(location => {
                    if (location.is_visited === true) {
                        return <section key={`location--${location.id}`} className="location">
                            <div className="location__park">Name of Park: {location?.park}</div>
                            <div className="location__city">Name of City: {location?.city}</div>
                            <Link to={`locations/details/${location.id}`}>Location Details</Link>
                        </section>
                    } 

                })
            }
            <h2 className="bucket_list">Bucket List</h2>
            {
                locations.map(location => {
                    if (location.is_visited === false) {
                        return <section key={`location--${location.id}`} className="location">
                            <div className="location__park">Name of Park: {location?.park}</div>
                            <div className="location__city">Name of City: {location?.city}</div>
                            <Link to={`locations/details/${location.id}`}>Location Details</Link>
                        </section>
                    }

                })
            }

        </article>

    )
}
