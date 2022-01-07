export const getLocations = () => {
    return fetch("https://secure-life.herokuapp.com/locations", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getLocation = (locationId) => {
    return fetch(`https://secure-life.herokuapp.com/locations/${locationId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createLocation = (location) => {
    return fetch("https://secure-life.herokuapp.com/locations", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(location)
     })
        .then(response => response.json())
}

export const updateLocation = (location, locationId) => {
    return fetch(`https://secure-life.herokuapp.com/locations/${locationId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(location)
    })
}

// export const getLocationTypes = () => {
//     return fetch("https://secure-life.herokuapp.com/locationtypes", { 
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("sl_token")}`
//         }
//     })
//         .then(response => response.json())
// }

export const deleteLocation = (id) => {
    return fetch(`https://secure-life.herokuapp.com/locations/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}
