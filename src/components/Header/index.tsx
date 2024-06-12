import { useEffect, useState } from "react"

import "./index.style.scss"
import { IMAGE_PATH, ROUTES } from "../../constants"
import { featureItems, userItems } from "./itemLists"
import Dropdown from "./Dropdown"
import Auth from "./Auth"
import { SearchOutlined } from "@ant-design/icons"
import { getState } from "../../redux/Header"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Noti from "./Noti"

export default function Header() {
  const navigate = useNavigate()
  const [isAtTop, setIsAtTop] = useState<boolean>(true)
  const [hasSearchBox, setHasSearchBox] = useState<boolean>(false)
  const { isAtHome, isAtSearch } = useSelector(getState)
  const [searchValue, setSearchValue] = useState<string>("")

  const handleScrollAtHome = () => {
    if (window.scrollY === 0) {
      setIsAtTop(true)
      setHasSearchBox(false)
    } else if (window.scrollY > 215) {
      setIsAtTop(false)
      setHasSearchBox(true)
    } else {
      setIsAtTop(false)
      setHasSearchBox(false)
    }
  }

  useEffect(() => {
    if (isAtHome) window.addEventListener("scroll", handleScrollAtHome)
    return () => {
      window.removeEventListener("scroll", handleScrollAtHome)
      setIsAtTop(true)
      setHasSearchBox(false)
    }
  }, [isAtHome])

  const configHeader = () => {
    if (isAtHome && isAtTop) return "header-at-top"
    if (isAtSearch) return "header-at-search"

    return "header-normal"
  }

  const handleSearch = () => {
    if (searchValue !== "") {
      navigate(ROUTES.SEARCH + `?q=${searchValue}`)
    }
  }

  return (
    <header
      className={`h-16 flex justify-center bg-transparent smooth-trans ${configHeader()}`}
    >
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
          <div className={`flex justify-between h-[50%] w-60 p-1 ml-4 border-solid border border-color-border-primary rounded-full ${
            isAtHome || isAtSearch ? (hasSearchBox ? "" : "hidden ") : ""
          }`}>
            <input
              className="h-auto w-full p-1 pl-4 text-base text-color-text-primary border-none rounded-full focus:outline-none"
              style={{ fontFamily: "Poppins" }}
              placeholder="Where to?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
            />
            <span 
              className="flex items-center font-semibold text-xl text-color-text-primary px-3.5 py-2.5 rounded-e-full bg-white hover:bg-color-hover-primary cursor-pointer"
              onClick={handleSearch}
            >
              <SearchOutlined/>
            </span>
          </div>
          <div className="header-item flex">
            {featureItems.map((val, index) => (
              <Dropdown menuItems={val.items} name={val.name} key={index} />
            ))}
          </div>
          <div className="header-item flex justify-end w-52">
            <Noti/>
            <Auth itemsList={userItems.items}/>
          </div>
        </nav>
      </div>
    </header>
  )
}
