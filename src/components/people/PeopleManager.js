export const getHumans = () => {
    return fetch("https://secure-life.herokuapp.com/humans", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getHuman = (humanId) => {
    return fetch(`https://secure-life.herokuapp.com/humans/${humanId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createHuman = (human) => {
    return fetch("https://secure-life.herokuapp.com/humans", {
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
    return fetch(`https://secure-life.herokuapp.com/humans/${humanId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(human)
    })
}

export const deleteHuman = (id) => {
    return fetch(`https://secure-life.herokuapp.com/humans/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const deleteHumanImage = (id) => {
    return fetch(`https://secure-life.herokuapp.com/humanimages/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadHumanImage = (image) => {
    return fetch("https://secure-life.herokuapp.com/humanimages", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getHumanImages = (humanId) => {
    return fetch(`https://secure-life.herokuapp.com/humanimages?humanId=${humanId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
