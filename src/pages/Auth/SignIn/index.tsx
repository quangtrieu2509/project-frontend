import { useGoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"

import "./index.style.scss"
import "../index.style.scss"
import { apiCaller } from "../../../api"
import { authApi } from "../../../api"
import { IMAGE_PATH } from "../../../constants"
import { setView, setUser, setGoogleToken } from "../../../redux/Auth"
import { messages } from "../../../constants/message"
import { APIResponse } from "../../../types/response"
import { AuthView } from "../../../redux/Auth/types"
import { setAuthStorage } from "../../../utils/Auth"
import Header from "../../../components/Auth/Header"

export default function SignIn() {
  const dispatch = useDispatch()

  const signInByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const GoogleToken = tokenResponse.access_token
      // console.log(GoogleToken)
      dispatch(setGoogleToken(GoogleToken))
      const res = await apiCaller(authApi.signInByGoogle(GoogleToken))
      console.log(res)

      if (res !== null) {
        const apiResponse = res as APIResponse

        if (apiResponse.ec === messages.CONNECT_GOOGLE_ACCOUNT.ec) {
          dispatch(setView(AuthView.CONNECT_GG_ACCOUNT))
          dispatch(setUser(apiResponse.data.user))

          setAuthStorage(res.data)
        } else {
          setAuthStorage(res.data)
          window.location.reload() // fix here
          //dispatch(setState(false))
        }
      }
    },
  })

  const signInByEmail = () => {
    dispatch(setView(AuthView.EMAIL_SIGNIN))
  }

  return (
    <div className="auth-page">
      <Header text="Sign in to discover more features."/>
      <div className="signin-body flex-col pb-2">
        <div>
          <div
            className="signin-button"
            onClick={() => signInByGoogle()}
          >
            <div className="signin-button-icon">
              <img
                alt="#"
                src={IMAGE_PATH.GOOGLE_ICON}
                className="image w-full"
              />
            </div>
            <span className="w-full text-center">Continue with Google</span>
          </div>
        </div>
        <div>
          <div
            className="signin-button"
            onClick={signInByEmail}
          >
            <div className="signin-button-icon">
              <img
                alt="#"
                src={IMAGE_PATH.EMAIL_ICON}
                className="image w-full"
              />
            </div>
            <span className="w-full text-center">Continue with email</span>
          </div>
        </div>
      </div>
    </div>
  )
}
