export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
     })
        .then(response => response.json())
}

export const updateEvent = (event, eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadEventImage = (image) => {
    return fetch("http://localhost:8000/eventimages", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getEventImages = (eventId) => {
    return fetch(`http://localhost:8000/eventimages?eventId=${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
