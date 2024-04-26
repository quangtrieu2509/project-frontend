import { ReactNode } from "react"
import BaseLayout from "../BaseLayout"
import useDocumentTitle from "../../hooks"

type PublicRouteProps = {
  title?: string
  children: ReactNode
}

const PublicRoute = (props: PublicRouteProps) => {
  useDocumentTitle(props.title)

  return <BaseLayout>{props.children}</BaseLayout>
}

export default PublicRoute
