export const getProfile = () => {
    return fetch("https://secure-life.herokuapp.com/profile", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sl_token")}`
        }
    })
        .then(res => res.json())
}