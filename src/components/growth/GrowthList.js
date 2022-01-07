import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getGrowthList, filterGrowth } from "./GrowthManager.js"
import { getHumans } from "./GrowthManager.js"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import './Growth.css'


export const GrowthList = (props) => {
    const history = useHistory()
    const [growth, setGrowth] = useState([])
    const [growthFilter, setGrowthFilter] = useState({})
    const [humans, setHumans] = useState([])
    const [display, setDisplay] = useState(0)
    const { growthId } = useParams()

    useEffect(() => {
        getGrowthList()
            .then(data => setGrowth(data))
    }, [])

    useEffect(() => {
        getHumans()
            .then(data => setHumans(data))
    }, [])

    const removeFilter = () => {
        getGrowthList()
            .then(data => setGrowth(data))
    }

    const handleSort = (e) => {
        setDisplay(e.target.value)
        if (e.target.value !== 0) {
            filterGrowth(e.target.value)
                .then(growth => setGrowth(growth))
        } else {
            getGrowthList().then(growth => setGrowth(growth))
        }
    }
    console.log(display)

    return (
        <article className="container__growthList">
            <div className="div__growthList">
                <Typography variant="h3" align='center' className="header__growthList">Growth Entries</Typography>
                <div className="btn__grouping">
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button className="btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: "/growth/new" })
                            }}
                        >Create New Entry</Button>
                    </ButtonGroup>
                </div>
            </div>
            <Container fluid="sm, md, lg, xl, xxl" className="card__container">
                <FormControl className="form-group">
                    <InputLabel htmlFor="growth__filter">Filter Growth List: </InputLabel>
                    <Select
                        name="name"
                        className="form-control"
                        type="text"
                        defaultValue={0}
                        onChange={handleSort}>
                        <MenuItem disabled value="0" >Select Name:</MenuItem>
                        {
                            humans.map(
                                (human) => {
                                    return <MenuItem name={human.id} value={human?.id}>{human?.name}</MenuItem>
                                })
                        }
                    </Select>
                    <Button className="btn btn-primary filter__remove" onClick={removeFilter}>Reset Filter</Button>
                </FormControl>
            </Container>
            <Container fluid="sm, md, lg, xl, xxl" className="card__container">
                <Row xs={1} md={3} lg={4} xl={5} className="card__row">
                    {
                        growth.map(growth => {
                            return <Col key={`growth--${growth.id}`} className="growth">
                                <Card className="card__card">
                                    <Card.Body className="card__body">
                                        <Card.Title className="growth__human">{growth?.human.name}</Card.Title>
                                        <Card.Text className="growth__date">Date: {growth?.date}</Card.Text>
                                        <Link to={`growth/details/${growth.id}`}>Details</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        }).reverse()
                    }
                </Row>
            </Container>
        </article>
    )
}
