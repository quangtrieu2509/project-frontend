import { ReactNode } from "react"
import { useDocumentTitle } from "../../hooks"
import Header from "../Header/Admin"

type PrivateRouteProps = {
  title?: string
  children: ReactNode
}

const PrivateRoute = (props: PrivateRouteProps) => {
  useDocumentTitle(props.title)

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header/>
      {props.children}
    </div>
  )
}

export default PrivateRoute
