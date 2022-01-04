export const getHumans = () => {
    return fetch("http://localhost:8000/humans", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getHuman = (humanId) => {
    return fetch(`http://localhost:8000/humans/${humanId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createHuman = (human) => {
    return fetch("http://localhost:8000/humans", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(human)
     })
        .then(response => response.json())
}

export const updateHuman = (human, humanId) => {
    return fetch(`http://localhost:8000/humans/${humanId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(human)
    })
}

export const deleteHuman = (id) => {
    return fetch(`http://localhost:8000/humans/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const deleteHumanImage = (id) => {
    return fetch(`http://localhost:8000/humanimages/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadHumanImage = (image) => {
    return fetch("http://localhost:8000/humanimages", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getHumanImages = (humanId) => {
    return fetch(`http://localhost:8000/humanimages?humanId=${humanId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
