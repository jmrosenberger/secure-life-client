import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getHumans } from "./PeopleManager.js"
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
            <h2>People in my Life</h2>
            <button className="btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/humans/new" })
                }}
            >Add new Person</button>
            {
                humans.map(human => {
                    return <section key={`human--${human.id}`} className="human">
                        <div className="human__name">{human?.name}</div>
                        {/* <div className="human__birthday">Birthday: {human?.birthday}</div> */}
                        <Link to={`humans/details/${human.id}`}>Details</Link>
                    </section>

                })
            }

        </article>

    )
}
