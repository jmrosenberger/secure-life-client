import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import Select from "react-dropdown-select"
import { createGrowth, getGrowth, updateGrowth, getHumans } from './GrowthManager.js'
// import "./Growth.css"

export const GrowthForm = () => {
    const history = useHistory()
    const [currentGrowth, setCurrentGrowth] = useState({})
    const [humans, setHumans] = useState([])
    const [editMode, toggleEditMode] = useState(false)
    const { growthId } = useParams()

    useEffect(() => {
        getHumans()
            .then(data => setHumans(data))
    },
    [])

    const getGrowthToEdit = () => {
        if (growthId) {
            toggleEditMode(true)
            getGrowth(growthId)
                .then(growthData => setCurrentGrowth({
                    ...growthData
                }))
        } else {
            setCurrentGrowth({
                human: 0,
                height: 0,
                weight: 0,
                length: 0,
                date: Date(),
                notes: ""
            })
        }
    }

    useEffect(() => {
        getGrowthToEdit()
    }, [growthId])


    const changeGrowthState = (event) => {
        const newGrowthState = { ...currentGrowth }
        newGrowthState[event.target.name] = event.target.value
        setCurrentGrowth(newGrowthState)
        console.log(newGrowthState)
    }

    return (
        <form className="growthForm">
            <h2 className="growthForm__heading">Growth Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <select name="human" placeholder="Select Name" defaultValue={0} className="form-control"
                        value={currentGrowth?.human?.name}
                        onChange={changeGrowthState}>
                        <option value="0" disabled>Select Name</option>
                        {
                            humans.map(
                                (human) => {
                                    return <option name="name" value={human.id}>{human.name}</option>
                                })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="height">Height: </label>
                    <input type="number" name="height" required autoFocus className="form-control"
                        value={currentGrowth.height}
                        onChange={changeGrowthState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="weight">Weight: </label>
                    <input type="number" name="weight" required autoFocus className="form-control"
                        value={currentGrowth.weight}
                        onChange={changeGrowthState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="length">Length: </label>
                    <input type="number" name="length" required autoFocus className="form-control"
                        value={currentGrowth.length}
                        onChange={changeGrowthState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentGrowth.date}
                        onChange={changeGrowthState}
                        id="date"
                        placeholder="Choose A Date"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes: </label>
                    <input type="textarea" name="notes" required className="form-control"
                        value={currentGrowth.notes}
                        onChange={changeGrowthState}
                        id="notes"
                        placeholder="Add entry notes here..."
                    />
                </div>
            </fieldset>
            <button onClick={(event) => {
                event.preventDefault()

                const growth = {
                    human: currentGrowth.human,
                    height: currentGrowth.height,
                    weight: currentGrowth.weight,
                    length: currentGrowth.length,
                    date: currentGrowth.date,
                    notes: currentGrowth.notes
                }
                {
                    editMode ?
                        updateGrowth(growth, growthId)
                            .then(() => { history.push('/growth') })
                        : createGrowth(growth)
                            .then(() => { history.push('/growth') })
                }
            }}
                className="btn btn-primary">Save Entry</button>
        </form>
    )
}
