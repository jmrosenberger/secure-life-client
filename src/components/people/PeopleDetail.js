import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { deleteHuman, getHuman } from "./PeopleManager.js"
import { confirmAlert } from "react-confirm-alert"
import "../react-confirm-alert.css"


export const PeopleDetail = () => {
    const { humanId } = useParams()
    const [human, setHuman] = useState({})
    const history = useHistory()
    // const [humanImage, setHumanImage] = useState("")
    // const [humanImages, setHumanImages] = useState([])

    useEffect(() => {
        if (humanId) {
            getHuman(humanId)
                .then(data => setHuman(data))
            // getImages()
        }
    }, [humanId])

    // const getImages = () => {
    //     getHumanImages(humanId)
    //         .then(images => setHumanImages(images))
    // }

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

    // File reader that converts image data to Base64
    // const getBase64 = (file, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(file);
    // }

    // Call file reader function and converts Base64 to string and saves it as a variable
    // const createHumanImageString = (event) => {
    //     getBase64(event.target.files[0], (base64ImageString) => {
    //         console.log("Base64 of file is", base64ImageString);

    //         // Update a component state variable to the value of base64ImageString
    //         setHumanImage(base64ImageString)
    //     })
    // }

    // const createImage = () => {
    //     const image = {
    //         human_id: parseInt(humanId),
    //         action_pic: humanImage
    //     }
    //     uploadHumanImage(image)
    //         .then(getImages)
    // }

    console.log(human)

    return (
        <>
            <h2>Human Details</h2>
            <section key={`human--${human?.id}`} className="human">
                <div className="human__name">{human?.name}</div>
                <div className="human__birthday">Birthday: {human?.birthday}</div>
                <div className="human__age">Age: {human?.age}</div>
                {/* <div className="human__images">
                    <h3>human Images</h3>
                    <div className="humanImages">
                        {humanImages?.map(img => {
                            return <>
                                <div className="humanImage">
                                    <img src={img?.action_pic} width="40%" alt={`human-${img?.action_pic}`} />
                                </div>
                            </>
                        })}
                    </div>
                    <input type="file" id="human_image" onChange={createHumanImageString} />
                    <input type="hidden" name="human_id" value={human.id} />
                    <button onClick={createImage}>Upload</button>
                </div> */}
                <button className="btn__edit"
                    onClick={() => {
                        history.push({ pathname: `/humans/edit/${human.id}` })
                    }}>Edit Human</button>
                <button className="btn__delete"
                    onClick={() => {
                        confirmDelete(human.id)
                    }}>Delete Human</button>
                <button className="btn__edit"
                    onClick={() => {
                        history.push({ pathname: `/humans` })
                    }}>Return to My People</button>
            </section>


        </>

    )
}
