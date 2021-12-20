import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import Select from "react-select"
import makeAnimated from 'react-select/animated'
import { createAdventure, getAdventure, updateAdventure } from './AdventureManager.js'
import { getHumans } from '../growth/GrowthManager.js'

export const TestForm = () => {
    const history = useHistory()
    const [currentAdventure, setCurrentAdventure] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { adventureId } = useParams()
    const [humans, setHumans] = useState([])
    const [participants, setParticipants] = useState([])
    const [participant, setParticipant] = useState({})

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

    const updateParticipants = (event) => {
        const newParticipant = { ...currentAdventure }
        newParticipant[event.target.name] = event.target.value
        setParticipant(newParticipant)
    }

    const changeAdventureState = (event) => {
        const newAdventureState = { ...currentAdventure }
        newAdventureState[event.target.name] = event.target.value
        setCurrentAdventure(newAdventureState)
    }


    console.log(participants)

    // const handleChange = (event) => {
    //     let participants = event.target.options
    //     let value = []
    //     for (let i = 0, l = participants.length; i < l; i++) {
    //         if (participants[i].selected) {
    //             value.push(participants[i].value)
    //         }
    //     }
    //     setParticipants(value)
    // }

    // console.log(participants)
    console.log(currentAdventure)
    console.log(currentAdventure.participants)
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
                    <label htmlFor="participants">Participants: </label>
                    <select name="participants" placeholder="Select Participant" className="form-control"
                        value={currentAdventure.participants}
                        multiple
                        onChange={updateParticipants, changeAdventureState}>
                        <option defaultValue="0" >Select Participant</option>
                        {
                            humans.map(
                                (human) => {
                                    return <option name="participants" id={human.id} value={human.name}>{human.name}</option>
                                })
                        }
                    </select>
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
                    participants: currentAdventure.participants,
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
