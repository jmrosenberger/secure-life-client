export const getGrowthList = () => {
    return fetch("http://localhost:8000/growth", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const filterGrowth = (filterDisplay) => {
    return fetch(`http://localhost:8000/growth?human=${filterDisplay}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getGrowth = (growthId) => {
    return fetch(`http://localhost:8000/growth/${growthId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

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

export const createGrowth = (growth) => {
    return fetch("http://localhost:8000/growth", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(growth)
     })
        .then(response => response.json())
}

export const updateGrowth = (growth, growthId) => {
    return fetch(`http://localhost:8000/growth/${growthId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(growth)
    })
}

export const deleteGrowth = (id) => {
    return fetch(`http://localhost:8000/growth/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadGrowthImage = (image) => {
    return fetch("http://localhost:8000/growthimages", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getGrowthImages = (growthId) => {
    return fetch(`http://localhost:8000/growthimages?growthId=${growthId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
