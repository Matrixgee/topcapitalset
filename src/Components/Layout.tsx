import { Outlet } from "react-router-dom"
import Header from "./TRY/Header"
import Footer from "./TRY/Footer"

const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout