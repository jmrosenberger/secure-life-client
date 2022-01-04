import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { deleteHuman, getHuman, uploadHumanImage, deleteHumanImage, getHumanImages } from "./PeopleManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../react-confirm-alert.css"
import "./PeopleDetail.css"


export const PeopleDetail = () => {
    const { humanId } = useParams()
    const [human, setHuman] = useState({})
    const history = useHistory()
    const [humanImage, setHumanImage] = useState("")
    const [humanImages, setHumanImages] = useState([])

    useEffect(() => {
        if (humanId) {
            getHuman(humanId)
                .then(data => setHuman(data))
            getImages()
        }
    }, [humanId])

    const getImages = () => {
        getHumanImages(humanId)
            .then(images => setHumanImages(images))
    }

    const deleteSingleHuman = (humanId) => {
        deleteHuman(humanId)
            .then(setTimeout(() => history.push({ pathname: "/humans" }), 200))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to DELETE this Human?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { deleteSingleHuman(id) }
                },
                {
                    label: 'No',
                    onClick: () => alert("Click No if you can't make up your mind")
                }]
        })
    }

    const deleteImage = (imageId) => {
        deleteHumanImage(imageId)
            .then(setTimeout(() => history.push({ pathname: `/humans/details/${humanId}` }), 50))
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
    const createHumanImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            // Update a component state variable to the value of base64ImageString
            setHumanImage(base64ImageString)
        })
    }

    const createImage = () => {
        const image = {
            human_id: parseInt(humanId),
            action_pic: humanImage
        }
        uploadHumanImage(image)
            .then(getImages)
    }


    return (
        <>
            <div className="human__details">
                <h2>Human Details</h2>
                <section key={`human--${human?.id}`} className="human--details">
                    <div className="human__name human__item">{human?.name}</div>
                    <div className="human__birthday human__item">Birthday: {human?.birthday}</div>
                    <div className="human__age human__item">Age: {human?.age}</div>
                    <div className="btn__group">
                        <button className="btn__edit"
                            onClick={() => {
                                history.push({ pathname: `/humans/edit/${human.id}` })
                            }}>Edit</button>
                        <button className="btn__delete"
                            onClick={() => {
                                confirmDelete(human.id)
                            }}>Remove Person from List</button>
                        <button className="btn__return"
                            onClick={() => {
                                history.push({ pathname: `/humans` })
                            }}>Go Back to My People</button>
                    </div>
                    <div className="human__images">
                        <h3>Profile Images</h3>
                        <input type="file" id="human_image" onChange={createHumanImageString} />
                        <input type="hidden" name="human_id" value={human.id} />
                        <button onClick={createImage}>Upload</button>
                        <div className="humanImages">
                            {humanImages?.map(img => {
                                return <>
                                    <div className="humanImage">
                                        <button className="btn__deleteImage"
                                            onClick={() => {
                                                confirmDeleteImage(img.id)
                                            }}>x</button>
                                        <img src={img?.action_pic} width="100%" alt={`human-${img?.action_pic}`} />
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
