import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getAdventureImages, uploadAdventureImage, deleteAdventure, deleteAdventureImage, getAdventure } from "./AdventureManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../react-confirm-alert.css"
import "./AdventureDetail.css"


export const AdventureDetail = () => {
    const { adventureId } = useParams()
    const [adventure, setAdventure] = useState({})
    const history = useHistory()
    const [adventureImage, setAdventureImage] = useState("")
    const [adventureImages, setAdventureImages] = useState([])

    useEffect(() => {
        if (adventureId) {
            getAdventure(adventureId)
                .then(data => setAdventure(data))
                .then(getImages())
        }
    }, [adventureId])

    const getImages = () => {
        getAdventureImages(adventureId)
            .then(images => setAdventureImages(images))
    }

    const deleteSingleAdventure = (adventureId) => {
        deleteAdventure(adventureId)
            .then(setTimeout(() => history.push({ pathname: "/adventures" }), 200))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this adventure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteSingleAdventure(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }]
        })
    }

    const deleteImage = (imageId) => {
        deleteAdventureImage(imageId)
            .then(setTimeout(() => history.push({ pathname: `/adventures/details/${adventureId}` }), 50))
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
    const createAdventureImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            // Update a component state variable to the value of base64ImageString
            setAdventureImage(base64ImageString)
        })
    }

    const createImage = () => {
        const image = {
            adventure_id: parseInt(adventureId),
            action_pic: adventureImage
        }
        uploadAdventureImage(image)
            .then(getImages)
    }

    console.log(adventure)

    return (
        <>
            <main className="adventure__details">
                <article className="details__container">
                    {/* <h2>Adventure Details</h2> */}
                    <section key={`adventure--${adventure?.id}`} className="adventure--details">
                        <div className="adventure__title">{adventure?.title}</div>
                        <div className="adventure__date">Date: {adventure?.date}</div><br />
                        <div className="adventure__location">Location: {adventure?.location?.park} - {adventure?.location?.city}, {adventure?.location?.state}</div><br />
                        <div className="adventure__participants">Participants: {
                            adventure?.participants?.map(participant => {
                                return participant.name
                            }).join(", ")}</div><br />
                        <div className="adventure__description">Notes: {adventure?.description}</div>
                        <div className="btn__group">
                            <button className="btn__edit"
                                onClick={() => {
                                    history.push({ pathname: `/adventures/edit/${adventure.id}` })
                                }}>Edit Adventure</button>
                            <button className="btn__delete"
                                onClick={() => {
                                    confirmDelete(adventure.id)
                                }}>Delete Adventure</button>
                            <button className="btn__return"
                                onClick={() => {
                                    history.push({ pathname: `/adventures` })
                                }}>Return to Adventures List</button>
                        </div>
                    </section>
                </article>
                <div className="adventure__images">
                    <h3>Adventure Images</h3>
                    <input type="file" id="adventure_image" onChange={createAdventureImageString} />
                    <input type="hidden" name="adventure_id" value={adventure.id} />
                    <button onClick={createImage}>Upload</button>
                    <div className="adventureImages">
                        {adventureImages?.map(img => {
                            return <>
                                <div className="adventureImage">
                                    <button className="btn__deleteImage"
                                        onClick={() => {
                                            confirmDeleteImage(img.id)
                                        }}>x</button>
                                    <img src={img?.action_pic} width="100%" alt={`adventure-${img?.action_pic}`} />
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}
