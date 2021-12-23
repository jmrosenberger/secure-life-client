import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getGrowthImages, uploadGrowthImage, deleteGrowth, getGrowth } from "./GrowthManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../react-confirm-alert.css"
// import "./Growth.css"

export const GrowthDetail = () => {
    const { growthId } = useParams()
    const [growth, setGrowth] = useState({})
    const history = useHistory()
    const [growthImage, setGrowthImage] = useState("")
    const [growthImages, setGrowthImages] = useState([])

    useEffect(() => {
        if (growthId) {
            getGrowth(growthId)
                .then(data => setGrowth(data))
            getImages()
        }
    }, [growthId])

    const getImages = () => {
        getGrowthImages(growthId)
            .then(images => setGrowthImages(images))
    }

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

    // File reader that converts image data to Base64
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    // Call file reader function and converts Base64 to string and saves it as a variable
    const createGrowthImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            // Update a component state variable to the value of base64ImageString
            setGrowthImage(base64ImageString)
        })
    }

    
    const createImage = () => {
        const image = {
            growth_id: parseInt(growthId),
            action_pic: growthImage
        }
        uploadGrowthImage(image)
            .then(getImages)
    }

    return (
        <>
            <h2>Growth Progress Details</h2>
            <section key={`growth--${growth?.id}`} className="growth">
                <div className="growth__human"><h4>{growth?.human?.name}</h4></div>
                <div className="growth__age">Age: {growth?.age} months</div>
                <div className="growth__height">Height: {growth?.height} inches</div>
                <div className="growth__weight">Weight: {growth?.weight} lbs</div>
                <div className="growth__length">Length: {growth?.length} inches</div>
                <div className="growth__date">Date: {growth?.date}</div>
                <div className="growth__notes">Notes: {growth?.notes}</div>
                <div className="adventure__images">
                    <h3>Pictures of Growth</h3>
                    <div className="growthImages">
                        {growthImages?.map(img => {
                            return <>
                                <div className="growthImage">
                                    <img src={img?.action_pic} width="40%" alt={`growth-${img?.action_pic}`} />
                                </div>
                            </>
                        })}
                    </div>
                    <input type="file" id="growth_image" onChange={createGrowthImageString} />
                    <input type="hidden" name="growth_id" value={growth.id} />
                    <button onClick={createImage}>Upload</button>
                </div>
                <button className="btn__edit"
                    onClick={() => {
                        history.push({ pathname: `/growth/edit/${growth.id}` })
                    }}>Edit Entry</button>
                <button className="btn__delete"
                    onClick={() => {
                        confirmDelete(growth.id)
                    }}>Delete Entry</button>
            </section>


        </>

    )
}
