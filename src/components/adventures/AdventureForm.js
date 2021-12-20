import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import Select from "react-dropdown-select"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { createAdventure, getAdventure, updateAdventure } from './AdventureManager.js'
import { getHumans } from '../growth/GrowthManager.js'

export const AdventureForm = () => {
    const history = useHistory()
    const [currentAdventure, setCurrentAdventure] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { adventureId } = useParams()
    const [humans, setHumans] = useState([])

    useEffect(() => {
        getHumans()
            .then(data => setHumans(data))
    },
        [])

    console.log(humans)

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
                    {/* { Form } */}
                    <React.Fragment>
                        <LiveProvider code="<strong>Hello World</strong>">
                            <LiveEditor />
                            <LiveError />
                            <LivePreview />
                        </LiveProvider>
                    </React.Fragment>
                    <React.Fragment>

                        <form>
                            <label htmlFor="participants">Participants:</label>
                            <Select
                                name="select"
                                options={
                                    humans.map(
                                        (human) => {
                                            return human.name
                                        })
                                }
                                values={[]}
                                required
                                multi
                                onChange={(value) => console.log(value)}
                            />
                            <button>Send</button>
                        </form>
                    </React.Fragment>
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
