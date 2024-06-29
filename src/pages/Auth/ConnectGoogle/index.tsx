import { useSelector } from "react-redux"

import "../index.style.scss"
import { IMAGE_PATH } from "../../../constants"
import { getState } from "../../../redux/Auth"

export default function ConnectGoogle() {
  const { user } = useSelector(getState)

  const onFinish = () => {
    window.location.reload() // fix here
    // dispatch(setState(false))
  }

  return (
    <div className="auth-page">
      <div className="cat-header">
        <p className="text-2xl font-semibold mt-2 mb-6">Success!</p>
        <p className=" text-sm mb-6">
          We have connected your account. You can now sign into
          <b>
            <span className="text-color-primary"> Trip</span>pie
          </b>{" "}
          anytime using Google.
        </p>
      </div>
      <div className="cat-body flex-col">
        <div>
          <div className="mb-6 flex h-16">
            <div className="flex relative">
              <img
                alt="#"
                src={IMAGE_PATH.DEFAULT_AVATAR}
                className="image w-full p-1 border-solid border-dividerFill border-2 rounded-full"
              />
              <img
                alt="#"
                src={IMAGE_PATH.GOOGLE_ICON}
                className="image w-[1.175rem] absolute bottom-0 right-0"
              />
            </div>
            <div className="flex flex-col h-full ml-4 justify-center">
              <div className="font-bold text-base">
                <span>
                  {user?.givenName ?? "given_name"} {user?.familyName ?? "family_name"}
                </span>
              </div>
              <div>
                <span>{user?.email ?? "account_email"}</span>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="primary-button w-fit"
              onClick={onFinish}
            >
              Done
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
