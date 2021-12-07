export const getLocations = () => {
    return fetch("http://localhost:8000/locations", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getLocation = (locationId) => {
    return fetch(`http://localhost:8000/locations/${locationId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createLocation = (location) => {
    return fetch("http://localhost:8000/locations", {
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
    return fetch(`http://localhost:8000/locations/${locationId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(location)
    })
}

// export const getLocationTypes = () => {
//     return fetch("http://localhost:8000/locationtypes", { 
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("sl_token")}`
//         }
//     })
//         .then(response => response.json())
// }

export const deleteLocation = (id) => {
    return fetch(`http://localhost:8000/locations/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}
