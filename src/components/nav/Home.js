import React from "react"
import { useHistory } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from 'react-bootstrap/Container'
import './Home.css'

export const Home = () => {
    const history = useHistory()

    return <>
    <Container className="containers__home">
            <div className="div__home">
                <Typography variant="h2" align='center' className="headers__home">Welcome To SecureLife</Typography>
            </div>
            <Container className="btns__grouping">
                    <ButtonGroup variant="text" className="btns__home" aria-label="text button group">
                        <Button className="btns btn-primarys"
                            onClick={() => {
                                history.push({ pathname: "/adventures" })
                            }}
                        >Adventures</Button>
                        <Button className="btns btn-primarys"
                            onClick={() => {
                                history.push({ pathname: "/growth" })
                            }}
                        >Growth</Button>
                        <Button className="btns btn-primarys"
                            onClick={() => {
                                history.push({ pathname: "/events" })
                            }}
                        >Events</Button>
                    </ButtonGroup>
                </Container>
        </Container>

    </>
}