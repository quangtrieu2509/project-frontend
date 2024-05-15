import React from "react"
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

import AppRouter from "./router"
import { GG_CLIENT_ID } from "./configs"

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
