import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getAdventureImages, uploadAdventureImage, deleteAdventure, deleteAdventureImage, getAdventure } from "./AdventureManager.js"
import { confirmAlert } from "react-confirm-alert"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from "react-bootstrap/Image"
import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
// import Container from '@mui/material/Container'
import FilledInput from '@mui/material/FilledInput'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import "../react-confirm-alert.css"
import "./AdventureDetail.css"
import man from "../images/man-on-watch.png" 


console.log(man)



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
    console.log('hello there')

    return (
        <>
        {console.log('hello there')}
            {/* <Box className="adventure__detailss"> */}
            <Container className="details__containers">
                {/* <h2>Adventure Details</h2> */}
                <Card key={`adventure--${adventure?.id}`} text="primary" body className="bg-light text-blue container__card">
                    <Card.Body>
                        {/* <Card.ImgOverlay> */}
                            <Card.Img src={man} alt="man" className="card__image" />
                            <Card.Title className="adventure__titles"><h2>{adventure?.title}</h2></Card.Title>
                            <Card.Text className="adventure__dates">Date: {adventure?.date}</Card.Text>
                            <Card.Text className="adventure__locations">Location: {adventure?.location?.park} - {adventure?.location?.city}, {adventure?.location?.state}</Card.Text>
                            <Card.Text className="adventure__participantss">Participants: {
                                adventure?.participants?.map(participant => {
                                    return participant.name
                                }).join(", ")}</Card.Text>
                            <Card.Text className="adventure__descriptions">Notes: {adventure?.description}</Card.Text>
                            <Card.Text className="btn__groups">
                                <ButtonGroup>
                                    <Button className="btn__edits"
                                        onClick={() => {
                                            history.push({ pathname: `/adventures/edit/${adventure.id}` })
                                        }}>Edit Adventure</Button>
                                    <Button className="btn__deletes"
                                        onClick={() => {
                                            confirmDelete(adventure.id)
                                        }}>Delete Adventure</Button>
                                    <Button className="btn__returns"
                                        onClick={() => {
                                            history.push({ pathname: `/adventures` })
                                        }}>Return to Adventures</Button>
                                </ButtonGroup>
                            </Card.Text>
                        {/* </Card.ImgOverlay> */}
                    </Card.Body>
                </Card>
            </Container>
            <Container fluid className="images__adventure">
                <Typography align="center" className="header__images" variant="h3">Adventure Images</Typography>
                <ImageList variant="masonry" cols={3} gap={8} className="images__list">
                    <FilledInput type="file" id="adventure_images" onChange={createAdventureImageString} />
                    <FilledInput type="hidden" name="adventure_id" value={adventure.id} />
                    <Button onClick={createImage}>Upload</Button>
                    {adventureImages?.map(img => {
                        return <>
                            <ImageListItem key={img.id} className="adventureImages">
                                <Button className="btn__deletesImages"
                                    onClick={() => {
                                        confirmDeleteImage(img.id)
                                    }}>x</Button>
                                <Image src={img?.action_pic} width="100%" fluid alt={`adventure-${img?.action_pic}`} />
                            </ImageListItem>
                        </>
                    }).reverse()}
                </ImageList>
            </Container>
            {/* </Box> */}
        </>
    )
}
