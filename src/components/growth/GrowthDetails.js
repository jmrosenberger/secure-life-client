import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { updateGrowth, deleteGrowth, getGrowth } from "./GrowthManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../react-confirm-alert.css"
// import "./Growth.css"


export const GrowthDetail = () => {
    const { growthId } = useParams()
    const [growth, setGrowth] = useState({})
    const history = useHistory()

    useEffect(() => {
        getGrowth(growthId)
            .then(data => setGrowth(data))
    }, [growthId])

    const deleteSingleGrowth = (growthId) => {
        deleteGrowth(growthId)
            .then(history.push({ pathname: "/growth" }))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this growth?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteSingleGrowth(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }
            ]
        })
    }

    return (
        <>
            <h2>Growth Progress Details</h2>
            <section key={`growth--${growth?.id}`} className="growth">
                <div className="growth__human">{growth?.human?.name}</div>
                <div className="growth__height">Height: {growth?.height}</div>
                <div className="growth__weight">Weight: {growth?.weight}</div>
                <div className="growth__length">Length: {growth?.length}</div>
                <div className="growth__date">Date: {growth?.date}</div>
                <button className="btn__edit"
                    onClick={() => {
                        history.push({ pathname: `/growth/edit/${growth.id}`})
                    }}>Edit Entry</button>
                <button className="btn__delete"
                    onClick={() => {
                        confirmDelete(growth.id)
                    }}>Delete Entry</button>
            </section>


        </>

    )
}
