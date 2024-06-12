import { ReactNode } from "react"
import BaseLayout from "../BaseLayout"
import { useDocumentTitle } from "../../hooks"
import { useSelector } from "react-redux"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants"
import { roles } from "../../constants"

type PrivateRouteProps = {
  title?: string
  children: ReactNode
}

const PrivateRoute = (props: PrivateRouteProps) => {
  useDocumentTitle(props.title)
  const navigate = useNavigate()
  const token = useSelector((state: any) => state.authReducer.token)
  const role = useSelector((state: any) => state.authReducer.role)

  return (
    <BaseLayout>
      {token && role === roles.ADMIN ? (
        props.children
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button onClick={() => navigate(ROUTES.HOME)} type="primary">
              Back Home
            </Button>
          }
        />
      )}
    </BaseLayout>
  )
}

export default PrivateRoute
