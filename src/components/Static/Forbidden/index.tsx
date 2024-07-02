import { Result } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants"

const Forbidden = () => {
  const navigate = useNavigate()
  const backHome = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <div className="flex justify-center">
          <div onClick={backHome} className="primary-button w-fit">
            Back Home
          </div>
        </div>
      }
    />
  )
}

export default Forbidden
