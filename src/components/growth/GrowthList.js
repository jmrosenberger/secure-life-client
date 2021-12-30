import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getGrowthList, filterGrowth } from "./GrowthManager.js"
import { getHumans } from "./GrowthManager.js"
// import './Growth.css'


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
        <article className="growth">
            <h2>Growth Entries</h2>
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/growth/new" })
                }}
            >Create New Entry</button>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="growth__filter">Filter Growth List: </label>
                    <select name="name" className="form-control"
                        type="text"
                        defaultValue={0}
                        onChange={handleSort}>
                        <option disabled value={0} >Select Name:</option>
                        {
                            humans.map(
                                (human) => {
                                    return <option value={human?.id}>{human?.name}</option>
                                })
                        }
                    </select>
                    <button className="filter__remove" onClick={removeFilter}>Reset Filter</button>
                </div>
            </fieldset>
            <div className="growth">
                {
                    growth.map(growth => {
                        return <section key={`growth--${growth.id}`} className="growth">
                            <div className="growth__human">{growth?.human.name}</div>
                            <div className="growth__date">Date: {growth?.date}</div>
                            <Link to={`growth/details/${growth.id}`}>Details</Link>
                        </section>

                    })
                }
            </div>
        </article>

    )
}
