import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getHuman, updateHuman, createHuman } from './PeopleManager.js'

export const PeopleForm = () => {
    const history = useHistory()
    const [currentHuman, setCurrentHuman] = useState({})
    const [editMode, toggleEditMode] = useState(false)
    const { humanId } = useParams()
    const [humans, setHumans] = useState([])


    const getHumanToEdit = () => {
        if (humanId) {
            toggleEditMode(true)
            getHuman(humanId)
                .then(humanData => {
                    setCurrentHuman(humanData)
                })
        } else {
            setCurrentHuman({
                name: "",
                birthday: "",
                age: 0
            })
        }
    }
    useEffect(() => {
        getHumanToEdit()
    }, [humanId])

    const changeHumanState = (event) => {
        const newHumanState = { ...currentHuman }
        newHumanState[event.target.name] = event.target.value
        setCurrentHuman(newHumanState)
    }

    function calculate_age(dob) {
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    return (
        <form className="humanForm">
            <h2 className="humanForm__header">Personal Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentHuman.name}
                        onChange={changeHumanState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday: </label>
                    <input type="date" name="birthday" required className="form-control"
                        value={currentHuman.birthday}
                        onChange={changeHumanState}
                    />
                </div>
            </fieldset>
            <button onClick={(event) => {
                event.preventDefault()

                const human = {
                    name: currentHuman.name,
                    birthday: currentHuman.birthday,
                    age: calculate_age(new Date(currentHuman.birthday))
                }
                {
                    editMode ?
                        updateHuman(human, humanId)
                            .then(() => { history.push('/humans') })
                        : createHuman(human)
                            .then(() => { history.push('/humans') })
                }
            }}
                className="btn btn-primary">Save Person</button>
        </form>
    )
}
