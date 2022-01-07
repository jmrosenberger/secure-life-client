export const getAdventures = () => {
    return fetch("https://secure-life.herokuapp.com/adventures", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getAdventure = (adventureId) => {
    return fetch(`https://secure-life.herokuapp.com/adventures/${adventureId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createAdventure = (adventure) => {
    return fetch("https://secure-life.herokuapp.com/adventures", {
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
    return fetch(`https://secure-life.herokuapp.com/adventures/${adventureId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adventure)
    })
}

export const deleteAdventure = (id) => {
    return fetch(`https://secure-life.herokuapp.com/adventures/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const deleteAdventureImage = (id) => {
    return fetch(`https://secure-life.herokuapp.com/images/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadAdventureImage = (image) => {
    return fetch("https://secure-life.herokuapp.com/images", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getAdventureImages = (adventureId) => {
    return fetch(`https://secure-life.herokuapp.com/images?adventureId=${adventureId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}

export const getImages = () => {
    return fetch('https://secure-life.herokuapp.com/images', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
