import { ReactNode } from "react"

import Header from "../Header"
import Footer from "../Footer"
import Convo from "../Convo"
import { getLocalStorage } from "../../utils/Auth"

interface BaseLayoutProps {
  children: ReactNode
}

function BaseLayout(props: BaseLayoutProps) {
  const token = getLocalStorage("token")
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      {props.children}
      {token && <Convo/>}
      <Footer />
    </div>
  )
}

export default BaseLayout
