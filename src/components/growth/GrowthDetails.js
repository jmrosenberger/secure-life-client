import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getGrowthImages, uploadGrowthImage, deleteGrowth, deleteGrowthImage, getGrowth } from "./GrowthManager.js"
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
import kids from "../images/growing_kids.jpg"
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
            .then(setTimeout(() => history.push({ pathname: `/growth/details/${growthId}` }), 200))
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
            <Container className="growth__detail">
                <Container>
                    <Typography variant="h2" align="center" className="header__growth">Growth Progress </Typography>
                    <Card key={`growth--${growth?.id}`} className="growth--detailss bg-light container__card">
                        <Card.Body>
                            <Card.Title className="growth__human growth__item">
                                <Typography variant="h4" className="growth__header">{growth?.human?.name}</Typography>
                            </Card.Title>
                            <Card.Text className="growth__ages growth__items"><strong>Age:</strong> {growth?.age} months</Card.Text>
                            <Card.Text className="growth__heights growth__items"><strong>Height:</strong> {growth?.height} inches</Card.Text>
                            <Card.Text className="growth__weights growth__items"><strong>Weight:</strong> {growth?.weight} lbs</Card.Text>
                            <Card.Text className="growth__lengths growth__items"><strong>Length:</strong> {growth?.length} inches</Card.Text>
                            <Card.Text className="growth__dates growth__items"><strong>Date:</strong> {growth?.date}</Card.Text>
                            <Card.Text className="growth__notess growth__items"><strong>Notes:</strong> {growth?.notes}</Card.Text>
                            <ButtonGroup className="btn__group">
                                <Button className="btn__edits"
                                    onClick={() => {
                                        history.push({ pathname: `/growth/edit/${growth.id}` })
                                    }}>Edit Entry</Button>
                                <Button className="btn__deletes"
                                    onClick={() => {
                                        confirmDelete(growth.id)
                                    }}>Delete Entry</Button>
                                <Button className="btn__returns"
                                    onClick={() => {
                                        history.push({ pathname: `/growth` })
                                    }}>Return to Events</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                </Container>
                <Container className="container__images">
                    <Typography variant="h4" className="header__growth" align="center">Pictures of Growth</Typography>
                    <ImageList variant="masonry" cols={3} gap={8} className="images__list">
                        <FilledInput type="file" id="growth_images" onChange={createGrowthImageString} />
                        <FilledInput type="hidden" name="growth_ids" value={growth.id} />
                        <Button onClick={createImage}>Upload</Button>
                        {growthImages?.map(img => {
                            return <>
                                <ImageListItem key={img.id} className="growthImages">
                                    <Button className="btn__deleteImages"
                                        onClick={() => {
                                            confirmDeleteImage(img.id)
                                        }}>x</Button>
                                    <Image src={img?.action_pic} fluid width="100%" alt={`growth-${img?.action_pic}`} />
                                </ImageListItem>
                            </>
                        }).reverse()}
                    </ImageList>
                </Container>
            </Container>
        </>
    )
}
