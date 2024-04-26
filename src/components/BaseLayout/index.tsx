import { ReactNode } from "react"

import Header from "../Header"
import Footer from "../Footer"
// import ScrollToTopButton from '../ScrollToTop';

interface BaseLayoutProps {
  children: ReactNode
}

function BaseLayout(props: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      {props.children}
      {/* <ScrollToTopButton /> */}
      <Footer />
    </div>
  )
}

export default BaseLayout
