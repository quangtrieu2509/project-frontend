import { IMAGE_PATH } from "../../../constants"
import Auth from "../Auth"
import "../index.style.scss"
import { useNavigate } from "react-router-dom"
import { adminItems } from "../itemLists"
import Noti from "../Noti"
import { getLocalStorage } from "../../../utils/Auth"

export default function Header() {
  const navigate = useNavigate()
  const token = getLocalStorage("token")

  return (
    <header className="header-normal h-16 flex justify-center bg-transparent">
      <div className="header-box max-w-6xl w-[72rem]">
        <nav className="header-nav">
          <div className="header-item flex w-56">
            <img
              alt="#"
              src={IMAGE_PATH.FULL_LOGO}
              className="image w-full cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="header-item flex">
            <div></div>
          </div>
          <div className="header-item flex justify-end w-52">
            {token && <Noti/>}
            <Auth itemsList={adminItems.items}/>
          </div>
        </nav>
      </div>
    </header>
  )
}
