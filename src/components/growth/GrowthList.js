import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getGrowthList } from "./GrowthManager.js"
// import './Growth.css'

export const GrowthList = (props) => {
    const history = useHistory()
    const [growthList, setGrowthList] = useState([])
    const { growthId } = useParams()

    useEffect(() => {
        getGrowthList()
            .then(data => setGrowthList(data))
    }, [])

    return (
        <article className="growth">
            <h2>Growth Entries</h2>
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/growth/new" })
                }}
            >Create New Entry</button>
            {
                growthList.map(growth => {
                    return <section key={`growth--${growth.id}`} className="growth">
                        <div className="growth__human">{growth?.human.name}</div>
                        <div className="growth__date">Date: {growth?.date}</div>
                        <Link to={`growth/details/${growth.id}`}>Details</Link>
                    </section>

                })
            }

        </article>

    )
}
