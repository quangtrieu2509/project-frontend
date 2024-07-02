import { Result } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants"

const NotFound = () => {
  const navigate = useNavigate()
  const backHome = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
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

export default NotFound
