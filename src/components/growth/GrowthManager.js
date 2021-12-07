export const getGrowthList = () => {
    return fetch("http://localhost:8000/growth", {
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

export const getGrowthTypes = () => {
    return fetch("http://localhost:8000/growthtypes", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteGrowth = (id) => {
    return fetch(`http://localhost:8000/growth/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}
