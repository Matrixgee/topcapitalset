import { Outlet } from "react-router-dom"
import Header from "./TRY/Header"
import Footer from "./TRY/Footer"
import ScrollToTop from "../ScrollToTop"

const Layout = () => {
  return (
    <div>
      <ScrollToTop/>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout