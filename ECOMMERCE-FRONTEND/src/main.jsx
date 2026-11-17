import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


//createRoot(...getElementById('root'))	Start React inside the <div id="root"> of index.html.
//BrowserRouter	Turns on page navigation (URLs).
//AuthProvider	Gives login data to the whole app.
//<App />	Our main app.
//<Toaster />	Shows the small popup messages.
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
            <Toaster />
        </AuthProvider>
    </BrowserRouter>
)