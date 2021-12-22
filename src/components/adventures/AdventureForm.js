import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createAdventure, getAdventure, updateAdventure } from './AdventureManager.js'
import { getHumans } from '../growth/GrowthManager.js'

export const AdventureForm = () => {
    const history = useHistory()
    const [currentAdventure, setCurrentAdventure] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { adventureId } = useParams()
    const [humans, setHumans] = useState([])
    const [participants, setParticipants] = useState([])

    useEffect(() => {
        getHumans()
            .then(data => setHumans(data))
    },
        [])

    // console.log(humans)

    const getAdventureToEdit = () => {
        if (adventureId) {
            toggleEditMode(true)
            getAdventure(adventureId)
                .then(adventureData => setCurrentAdventure({
                    ...adventureData
                }))
        } else {
            setCurrentAdventure({
                title: "",
                date: Date(),
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

    // const updateParticipants = (event) => {
    //     const newAdventureState = { ...currentAdventure }
    //     newAdventureState.participants = event.target.checked
    //     setCurrentAdventure(newAdventureState)
    // }

    const updateParticipants = (event) => {
        const participantsArray = [ ...participants ]
        
        // have to make a checker function... isChecked: boolean
        // if value of what is checked is already in array... remove it (splice)
        // if not in the array... push into the array
        // parseInt 
        participantsArray.push(event.target.value)
        setParticipants(participantsArray)
    }

    currentAdventure.participants = participants

console.log(participants)

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
                    {
                        humans.map(
                            (human) => {
                                return <div><label htmlFor={`participants--${human.id}`}>{human.name}</label>
                                    <input type="checkbox" name={`participants--${human.id}`} required autoFocus className="form-control"
                                        value={human.id}
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
                    <label htmlFor="description">Description: </label>
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
