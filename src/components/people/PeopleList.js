import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getHumans } from "./PeopleManager.js"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import './People.css'

export const PeopleList = (props) => {
    const history = useHistory()
    const [humans, setHumans] = useState([])
    const { humanId } = useParams()

    useEffect(() => {
        getHumans()
            .then(data => setHumans(data))
    }, [])


    return (
        <article className="humans__container">
            <div className="div__humanList">
                <Typography variant="h3" align='center' className="header__humanList">People In My Life</Typography>
                <Button className="btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/humans/new" })
                    }}
                >Add new Person</Button>
            </div>
            <Container fluid="sm, md, lg, xl, xxl" className="card__container">
                <Row xs={1} md={3} lg={4} xl={5} className="card__row">
                    {
                        humans.map(human => {
                            return <Col key={`human--${human.id}`} className="human">
                                <Card className="card__card">
                                    <Card.Body className="card__body">
                                        <Card.Title className="human__name">{human?.name}</Card.Title>
                                        <Link to={`humans/details/${human.id}`}>Details</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        })
                    }
                </Row>
            </Container>
        </article>
    )
}
