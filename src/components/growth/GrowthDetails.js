import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getGrowthImages, uploadGrowthImage, deleteGrowth, deleteGrowthImage, getGrowth } from "./GrowthManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../react-confirm-alert.css"
import "./GrowthDetail.css"

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

    const deleteImage = (imageId) => {
        deleteGrowthImage(imageId)
            .then(setTimeout(() => history.push({ pathname: `/growth/details/${growthId}` }), 50))
            .then(setTimeout(() => getImages(), 200))
    }

    const confirmDeleteImage = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this image?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteImage(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }]
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

    console.log(growth)
    return (
        <>
            <div className="growth__details">
                <h2>Growth Progress </h2>
                <section key={`growth--${growth?.id}`} className="growth--details">
                    <div className="growth__human growth__item"><h4>{growth?.human?.name}</h4></div>
                    <div className="growth__age growth__item">Age: {growth?.age} months</div>
                    <div className="growth__height growth__item">Height: {growth?.height} inches</div>
                    <div className="growth__weight growth__item">Weight: {growth?.weight} lbs</div>
                    <div className="growth__length growth__item">Length: {growth?.length} inches</div>
                    <div className="growth__date growth__item">Date: {growth?.date}</div>
                    <div className="growth__notes growth__item">Notes: {growth?.notes}</div>
                    <div className="btn__group">
                        <button className="btn__edit"
                            onClick={() => {
                                history.push({ pathname: `/growth/edit/${growth.id}` })
                            }}>Edit Entry</button>
                        <button className="btn__delete"
                            onClick={() => {
                                confirmDelete(growth.id)
                            }}>Delete Entry</button>
                        <button className="btn__return"
                            onClick={() => {
                                history.push({ pathname: `/growth` })
                            }}>Return to Events</button>
                    </div>
                    <div className="growth__images">
                        <h3>Pictures of Growth</h3>
                        <input type="file" id="growth_image" onChange={createGrowthImageString} />
                        <input type="hidden" name="growth_id" value={growth.id} />
                        <button onClick={createImage}>Upload</button>
                        <div className="growthImages">
                            {growthImages?.map(img => {
                                return <>
                                    <div className="growthImage">
                                        <button className="btn__deleteImage"
                                            onClick={() => {
                                                confirmDeleteImage(img.id)
                                            }}>x</button>
                                        <img src={img?.action_pic} width="100%" alt={`growth-${img?.action_pic}`} />
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
