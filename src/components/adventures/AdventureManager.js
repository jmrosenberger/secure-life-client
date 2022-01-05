export const getAdventures = () => {
    return fetch("http://localhost:8000/adventures", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getAdventure = (adventureId) => {
    return fetch(`http://localhost:8000/adventures/${adventureId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createAdventure = (adventure) => {
    return fetch("http://localhost:8000/adventures", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adventure)
     })
        .then(response => response.json())
}

export const updateAdventure = (adventure, adventureId) => {
    return fetch(`http://localhost:8000/adventures/${adventureId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adventure)
    })
}

export const deleteAdventure = (id) => {
    return fetch(`http://localhost:8000/adventures/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const deleteAdventureImage = (id) => {
    return fetch(`http://localhost:8000/images/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadAdventureImage = (image) => {
    return fetch("http://localhost:8000/images", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getAdventureImages = (adventureId) => {
    return fetch(`http://localhost:8000/images?adventureId=${adventureId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}

export const getImages = () => {
    return fetch('http://localhost:8000/images', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
