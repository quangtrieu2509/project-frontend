import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiCaller, authApi } from "../../../api"

export default function ActivateEmail() {
  const [isActive, setIsActive] = useState<boolean>()
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      const activate = async () => {
        const res = await apiCaller(authApi.activateEmail(token),
          (_) => {
            setIsActive(false)
          }
        )

        if (res !== undefined) {
          setIsActive(true)
        }
      }

      activate()
    }
    
  }, [token])

  return (
    <div className="tp-page">
      <div className="tp-wrapper">
        <div className="w-full flex flex-col items-center">
          <div className="mb-4">
          {
            isActive === undefined ? "Loading..." : isActive === true ?
            "Your account has already activated. Go back home and sign in..." :
            "Go back home and try again..."
          }
          </div>
          <div className="primary-button w-fit"
            onClick={() => window.location.replace("/")}
          >
            Back Home
          </div>
        </div>
      </div>
    </div>
  )
}