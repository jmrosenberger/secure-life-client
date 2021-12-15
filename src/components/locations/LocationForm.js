import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createLocation, getLocation, updateLocation } from './LocationManager.js'

export const LocationForm = () => {
    const history = useHistory()
    const [currentLocation, setCurrentLocation] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { locationId } = useParams()


    const getLocationToEdit = () => {
        if (locationId) {
            toggleEditMode(true)
            getLocation(locationId)
                .then(locationData => setCurrentLocation({
                    ...locationData
                }))
        } else {
            setCurrentLocation({
                city: "",
                park: ""
            })
        }
    }
    console.log(currentLocation)

    useEffect(() => {
        getLocationToEdit()
    }, [locationId])

    const changeLocationState = (event) => {
        const newLocationState = { ...currentLocation }
        newLocationState[event.target.name] = event.target.value
        setCurrentLocation(newLocationState)
    }

    return (
        <form className="locationForm">
            <h2 className="locationForm__city">Location Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city">City Name: </label>
                    <input type="text" name="city" required autoFocus className="form-control"
                        value={currentLocation?.city}
                        onChange={changeLocationState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="park">Park Name: </label>
                    <input type="text" name="park" required autoFocus className="form-control"
                        value={currentLocation?.park}
                        onChange={changeLocationState}
                    />
                </div>
            </fieldset>
            <button onClick={(event) => {
                event.preventDefault()

                const location = {
                    city: currentLocation.city,
                    park: currentLocation.park
                }
                {
                    editMode ? 
                        updateLocation(location, locationId)
                            .then(() => {history.push('/locations')})
                        : createLocation(location)
                            .then(() => {history.push('/locations')})
                }
            }}
            className="btn btn-primary">Save Location</button>
        </form>
    )
}
