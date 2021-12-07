export const getDailyEntryList = () => {
    return fetch("http://localhost:8000/daily_entries", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(response => response.json())
}

export const getDailyEntry = (dailyEntryId) => {
    return fetch(`http://localhost:8000/games/${dailyEntryId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
        }
    })
        .then(res => res.json())
}

export const createDailyEntry = (dailyEntry) => {
    return fetch("http://localhost:8000/daily_entries", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dailyEntry)
     })
        .then(response => response.json())
}

export const updateDailyEntry = (dailyEntry, dailyEntryId) => {
    return fetch(`http://localhost:8000/games/${dailyEntryId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dailyEntry)
    })
}

// export const getGameTypes = () => {
//     return fetch("http://localhost:8000/gametypes", { 
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("sl_token")}`
//         }
//     })
//         .then(response => response.json())
// }

export const deleteDailyEntry = (id) => {
    return fetch(`http://localhost:8000/daily_entries/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
}
