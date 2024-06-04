import { ReactNode } from "react"
import BaseLayout from "../BaseLayout"
import useDocumentTitle from "../../hooks"
import Header from "../Header/Business"

type PublicRouteProps = {
  title?: string
  children: ReactNode
}

const PublicRoute = (props: PublicRouteProps) => {
  useDocumentTitle(props.title)

  return <BaseLayout>{props.children}</BaseLayout>
}

const BusinessRoute = (props: PublicRouteProps) => {
  useDocumentTitle(props.title)

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header/>
      {props.children}
      {/* <ScrollToTopButton /> */}
    </div>
  )
}

export { PublicRoute, BusinessRoute }
