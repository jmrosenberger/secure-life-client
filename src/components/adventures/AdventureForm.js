import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createAdventure, getAdventure, updateAdventure } from './AdventureManager.js'
// import "./Games.css"

export const AdventureForm = () => {
    const history = useHistory()
    const [currentAdventure, setCurrentAdventure] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { adventureId } = useParams()


    const getAdventureToEdit = () => {
        if (adventureId) {
            toggleEditMode(true)
            getAdventure(adventureId)
                .then(adventureData => setCurrentAdventure({
                    ...adventureData
                    // skillLevel: adventureData.skill_level,
                    // numberOfPlayers: adventureData.number_of_players,
                    // gameTypeId: adventureData.game_type.id
                }))
        } else {
            setCurrentAdventure({
                title: "",
                human: "",
                date: Date(),
                description: ""
            })
        }
    }
    console.log(currentAdventure)

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
                        value={currentAdventure?.title}
                        onChange={changeAdventureState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="human">Human: </label>
                    <input type="text" name="human" required autoFocus className="form-control"
                        value={currentAdventure?.human}
                        onChange={changeAdventureState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentAdventure?.date}
                        onChange={changeAdventureState}
                        id="date"
                        placeholder="Choose A Date"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentAdventure?.description}
                        onChange={changeAdventureState}
                    />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select name="gameTypeId" placeholder="Select Game Type" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value="0" disabled>Select Game Type</option>
                        {
                            gameTypes.map(
                                (gameType) => {
                                    return <option name="gameTypeId" value={gameType.id}>{gameType.label}</option>
                                })
                        }
                    </select>
                </div>
            </fieldset> */}
            <button onClick={(event) => {
                event.preventDefault()

                const adventure = {
                    title: currentAdventure.title,
                    human: currentAdventure.human,
                    date: currentAdventure.date,
                    description: currentAdventure.description
                }
                {
                    editMode ? 
                        updateAdventure(adventure, adventureId)
                            .then(() => {history.push('/adventures')})
                        : createAdventure(adventure)
                            .then(() => {history.push('/adventures')})
                }
            }}
            className="btn btn-primary">Save Adventure</button>
        </form>
    )
}
