import React from "react"
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

import AppRouter from "./router"
import { GG_CLIENT_ID } from "./configs"
import { Spin } from "antd"
import { useSelector } from "react-redux"
import { getState } from "./redux/Loader"

const App: React.FC = () => {
  const loaderState = useSelector(getState).state

  return (
    <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
      <BrowserRouter>
        {loaderState && <Spin spinning fullscreen />}
        <AppRouter />
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
