import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { deleteHuman, getHuman, uploadHumanImage, deleteHumanImage, getHumanImages } from "./PeopleManager.js"
import { confirmAlert } from "react-confirm-alert"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from "react-bootstrap/Image"
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FilledInput from '@mui/material/FilledInput'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
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
            .then(setTimeout(() => history.push({ pathname: `/humans/details/${humanId}` }), 200))
            .then(setTimeout(() => getImages(), 350))
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
            <Container className="human__details">
                {/* <Typography variant="h2" className="header__human" align="center">Personal Details</Typography> */}
                <Card key={`human--${human?.id}`} className="human--details bg-light container__card">
                    <Card.Body>
                        <Card.Title className="human__name human__item">
                            <Typography variant="h5" className="human__header">{human?.name}</Typography>
                        </Card.Title>
                        <Card.Text className="human__birthday human__item">Birthday: {human?.birthday}</Card.Text>
                        <Card.Text className="human__age human__item">Age: {human?.age}</Card.Text>
                        <ButtonGroup className="btn__group">
                            <Button className="btn__edit"
                                onClick={() => {
                                    history.push({ pathname: `/humans/edit/${human.id}` })
                                }}>Edit</Button>
                            <Button className="btn__delete"
                                onClick={() => {
                                    confirmDelete(human.id)
                                }}>Remove Person from List</Button>
                            <Button className="btn__return"
                                onClick={() => {
                                    history.push({ pathname: `/humans` })
                                }}>Go Back to My People</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="container__images">
                <Typography variant="h4" className="header__human" align="center">Profile Images</Typography>
                <ImageList variant="masonry" cols={3} gap={8} className="images__list">
                    <FilledInput type="file" id="human_image" onChange={createHumanImageString} />
                    <FilledInput type="hidden" name="human_id" value={human.id} />
                    <Button onClick={createImage}>Upload</Button>
                    {humanImages?.map(img => {
                        return <>
                            <ImageListItem key={img.id} className="humanImages">
                                <Button className="btn__deleteImage"
                                    onClick={() => {
                                        confirmDeleteImage(img.id)
                                    }}>x</Button>
                                <Image src={img?.action_pic} width="100%" alt={`human-${img?.action_pic}`} />
                            </ImageListItem>
                        </>
                    }).reverse()}
                </ImageList>
            </Container>
        </>
    )
}
