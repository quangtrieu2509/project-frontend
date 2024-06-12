import React from "react"
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

import AppRouter from "./router"
import { GG_CLIENT_ID } from "./configs"
import SocketProvider from "./hooks/SocketContex"

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
      <SocketProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </SocketProvider>
    </GoogleOAuthProvider>
  )
}

export default App
