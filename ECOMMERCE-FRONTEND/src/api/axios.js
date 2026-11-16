import axios from 'axios' //BRING THE AXIOS LIBRARY

//Make our own Axios with a fixed server address.
const api = axios.create({
    //baseURL: 'http://localhost:9090/api/v1', 	Every request starts with this URL. 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9090/api/v1',
})

//Run this code before every request.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') //Read the saved token from the browser.
    if (token) {     //Only if the user is logged in.
        config.headers.Authorization = token      //Attach the token to the request header.
    }
    return config    //Send the request forward.	
})

export default api  //Let other files use api.