export const getGrowthList = () => {
    return fetch("https://secure-life.herokuapp.com/growth", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const filterGrowth = (filterDisplay) => {
    return fetch(`https://secure-life.herokuapp.com/growth?human=${filterDisplay}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getGrowth = (growthId) => {
    return fetch(`https://secure-life.herokuapp.com/growth/${growthId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

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

export const createGrowth = (growth) => {
    return fetch("https://secure-life.herokuapp.com/growth", {
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
    return fetch(`https://secure-life.herokuapp.com/growth/${growthId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(growth)
    })
}

export const deleteGrowth = (id) => {
    return fetch(`https://secure-life.herokuapp.com/growth/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const deleteGrowthImage = (id) => {
    return fetch(`https://secure-life.herokuapp.com/growthimages/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadGrowthImage = (image) => {
    return fetch("https://secure-life.herokuapp.com/growthimages", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getGrowthImages = (growthId) => {
    return fetch(`https://secure-life.herokuapp.com/growthimages?growthId=${growthId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
