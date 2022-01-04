import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createAdventure, getAdventure, updateAdventure } from './AdventureManager.js'
import { getHumans } from '../growth/GrowthManager.js'
import { getLocations } from '../locations/LocationManager.js'
import './Adventures.css'

export const TestForm = () => {
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
        const locationState = { ...location}
        locationState.id = event.target.value
        console.log(locationState.id)
        setLocation(locationState.id)
    }

    const updateParticipants = (event) => {
        const participantsArray = [...participants]
        const value = parseInt(event.target.value)

        if (participantsArray.includes(value)) {
            const index = participantsArray.indexOf(value)
            participantsArray.splice(index, 1)
        } else {
            participantsArray.push(value)
        }
        setParticipants(participantsArray)
    }
    
    currentAdventure.location = location

    return (
        <form className="adventureForm">
            <h2 className="adventureForm__title">Adventure Details</h2>
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
                <div className="form-group">
                    {
                        humans.map(
                            (human) => {
                                return <div><label htmlFor={`participants--${human.id}`}>{human.name}</label>
                                    <input type="checkbox" name={`participants--${human.id}`} autoFocus className="form-control"
                                        value={human.id}
                                        checked={participants.includes(human.id)}
                                        key={human.id}
                                        onChange={updateParticipants}
                                    />
                                </div>
                            }
                        )
                    }
                </div>
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
        </form>
    )
}
