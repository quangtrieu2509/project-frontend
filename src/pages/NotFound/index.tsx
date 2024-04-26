import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants"

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
        <Button onClick={backHome} type="primary">
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
