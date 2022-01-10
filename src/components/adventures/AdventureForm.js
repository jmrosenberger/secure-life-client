import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createAdventure, getAdventure, updateAdventure } from './AdventureManager.js'
import { getHumans } from '../growth/GrowthManager.js'
import { getLocations } from '../locations/LocationManager.js'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import './AdventureForm.css'

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


    return (
        <Box component="form" className="box__adventureForm">
            <Container fluid="true" className="adventureForm">
                <Typography variant="h4" align="center" className="header__adventureForm">Adventure Form</Typography>
                <Container fluid="true" className="input__group">
                    <FormControl margin="none" value={currentAdventure.title} variant="filled" className="controls__adventureForm title__adventureForm">
                        <InputLabel htmlFor="title" shrink className="input__label label__adventureForm title__label">Title: </InputLabel>
                        <FilledInput
                            type="text"
                            name="title"
                            required
                            autoFocus
                            className="input__input input__filledInput title__input"
                            value={currentAdventure.title}
                            onChange={changeAdventureState}
                        />
                    </FormControl>
                    <FormControl margin="none" value={currentAdventure.date} variant="filled" className="form-groups">
                        <InputLabel htmlFor="date" className="input__label label__adventureForm"></InputLabel>
                        <FilledInput
                            type="date"
                            name="date"
                            required
                            className="input__input input__filledInput"
                            value={currentAdventure.date}
                            onChange={changeAdventureState}
                            id="date"
                        />
                    </FormControl>
                    <FormControl margin="none" value={location.id} variant="filled" className="form-groups">
                        <InputLabel id="demo-simple-select-label" shrink className="input__label label__adventureForm label__select" htmlFor="location">Location: </InputLabel>
                        <Select
                            name="location"
                            autoWidth
                            className="input__input input__filledInput input__select"
                            labelId="demo-simple-select-label"
                            value={location.id}
                            label="Location:"
                            onChange={updateLocation}>
                            <MenuItem value="0" disabled>Select Location</MenuItem>
                            {
                                locations.map(
                                    (location) => {
                                        return <MenuItem key={location.id} name={location.id} value={location.id}>{location.park} - {location.city}, {location.state}</MenuItem>
                                    })
                            }
                        </Select>
                    </FormControl>
                </Container>
                <Container className="container__participants">
                    <FormControl margin="none" value={participants} className="form__participants">
                        <Typography variant="h5" align='center' className="header__participants">Select Participants</Typography>
                        <ButtonGroup className="button__group__participants">
                            <ToggleButtonGroup
                                type='checkbox'
                                value={participants}
                                onChange={updateParticipants}>
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
                        </ButtonGroup>
                    </FormControl>
                </Container>
                <FormControl margin="none" value={currentAdventure.description} fullWidth className="form-groups">
                    <InputLabel htmlFor="component-outlined" shrink className="input__label label__adventureForm title__label">Notes: </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        name="description"
                        label="description"
                        className="input__input input__filledInput title__input"
                        required
                        value={currentAdventure.description}
                        onChange={changeAdventureState}
                    />
                </FormControl>
                <Button onClick={(event) => {
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
                    className="btn btn-primary">Save Adventure</Button>
            </Container>
        </Box>
    )
}
