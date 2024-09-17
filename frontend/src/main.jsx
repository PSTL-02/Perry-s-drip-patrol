import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ListingsContextProvider } from './context/ListingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ListingsContextProvider>
        <App />
      </ListingsContextProvider> 
    </AuthContextProvider>
  </React.StrictMode>,
)
