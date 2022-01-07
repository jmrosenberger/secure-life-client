export const getEvents = () => {
    return fetch("https://secure-life.herokuapp.com/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getEvent = (eventId) => {
    return fetch(`https://secure-life.herokuapp.com/events/${eventId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createEvent = (event) => {
    return fetch("https://secure-life.herokuapp.com/events", {
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
    return fetch(`https://secure-life.herokuapp.com/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}

export const deleteEvent = (id) => {
    return fetch(`https://secure-life.herokuapp.com/events/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const deleteEventImage = (id) => {
    return fetch(`https://secure-life.herokuapp.com/eventimages/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}

export const uploadEventImage = (image) => {
    return fetch("https://secure-life.herokuapp.com/eventimages", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}

export const getEventImages = (eventId) => {
    return fetch(`https://secure-life.herokuapp.com/eventimages?eventId=${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}
