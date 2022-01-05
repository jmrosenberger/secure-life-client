import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createAdventure, getAdventure, updateAdventure } from './AdventureManager.js'
import { getHumans } from '../growth/GrowthManager.js'
import { getLocations } from '../locations/LocationManager.js'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button'
import './AdventuresList.css'

export const AdventureForm = () => {
    const history = useHistory()
    const [currentAdventure, setCurrentAdventure] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { adventureId } = useParams()
    const [humans, setHumans] = useState([])
    const [participants, setParticipants] = useState([])
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState({})

    useEffect(() => {
        getHumans()
            .then(data => setHumans(data))
    },
        [])

    useEffect(() => {
        getLocations()
            .then(data => setLocations(data))
    },
        [])

    const getAdventureToEdit = () => {
        if (adventureId) {
            toggleEditMode(true)
            getAdventure(adventureId)
                .then(adventureData => {
                    setCurrentAdventure(adventureData)
                    let array = []
                    for (const participant of adventureData.participants) {
                        array.push(participant.id)
                    }
                    setParticipants(array)
                })
        } else {
            setCurrentAdventure({
                title: "",
                date: Date(),
                location: 0,
                participants: [],
                description: ""
            })
        }
    }
    useEffect(() => {
        getAdventureToEdit()
    }, [adventureId])

    const changeAdventureState = (event) => {
        const newAdventureState = { ...currentAdventure }
        newAdventureState[event.target.name] = event.target.value
        setCurrentAdventure(newAdventureState)
    }

    const updateLocation = (event) => {
        const locationState = { ...location }
        locationState.id = event.target.value
        console.log(locationState.id)
        setLocation(locationState.id)
    }

    const updateParticipants = (val, participants) => setParticipants(val, participants)

    currentAdventure.location = location


    // console.log(participants)

    return (
        <form className="adventureForm">
            <h2 className="adventureForm__title">Adventure Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentAdventure.title}
                        onChange={changeAdventureState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentAdventure.date}
                        onChange={changeAdventureState}
                        id="date"
                        placeholder="Choose A Date"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <select name="location" placeholder="Select Location" className="form-control"
                        value={location.id}
                        // selected={location.id}
                        defaultValue={0}
                        onChange={updateLocation}>
                        <option value="0" disabled>Select Location</option>
                        {
                            locations.map(
                                (location) => {
                                    return <option name={location.id} value={location.id}>{location.park} - {location.city}, {location.state}</option>
                                })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <ToggleButtonGroup type='checkbox' value={participants} onChange={updateParticipants}>
                    {
                        humans.map((human) => {
                            return <ToggleButton id={`tbg-btn--${human.id}`}
                                value={human?.id}
                                key={`human--id${human.id}`}
                                name="participant"
                                type='checkbox'>
                                {human?.name}
                            </ToggleButton>
                        })
                    }
                </ToggleButtonGroup>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Notes: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentAdventure.description}
                        onChange={changeAdventureState}
                    />
                </div>
            </fieldset>
            <button onClick={(event) => {
                event.preventDefault()
                const adventure = {
                    title: currentAdventure.title,
                    date: currentAdventure.date,
                    location: currentAdventure.location,
                    participants: participants,
                    description: currentAdventure.description
                }
                {
                    editMode ?
                        updateAdventure(adventure, adventureId)
                            .then(() => { history.push('/adventures') })
                        : createAdventure(adventure)
                            .then(() => { history.push('/adventures') })
                }
            }}
                className="btn btn-primary">Save Adventure</button>

            <div>{participants}</div>
        </form>
    )
}
