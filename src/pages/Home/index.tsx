import { useDispatch } from "react-redux"
import "./index.style.scss"
import { setIsAtHome } from "../../redux/Header"
import { useEffect, useState } from "react"
import { ArrowRightOutlined } from "@ant-design/icons"
import { IMAGE_PATH, ROUTES } from "../../constants"
import { Tabs } from "antd"
import { categoryItems, getCatPhrases } from "./itemLists"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [categoryKey, setCategoryKey] = useState<string>("all")
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    dispatch(setIsAtHome(true))

    return () => {
      dispatch(setIsAtHome(false))
    }
  }, [dispatch])

  const handleRecommend = () => {
    alert("handle recommend")
  }

  const handleOnChange = (value: string) => {
    setCategoryKey(value)
  }

  const handleSearch = () => {
    if (searchValue !== "") {
      navigate(ROUTES.SEARCH + `?q=${searchValue}&filter=${categoryKey}`)
    }
  }

  return (
    <div className="tp-page">
      <img
        alt="#"
        src={IMAGE_PATH.DECOR_1}
        className="image w-1/2 absolute right-0 top-0 -z-50"
      />
      <img
        alt="#"
        src={IMAGE_PATH.DECOR_2}
        className="image w-1/6 absolute left-0 top-0 -z-50"
      />
      <div className="tp-wrapper flex flex-col items-center">
        <h1 className="text-[3.5rem] text-center text-color-text-primary mb-0">
          {getCatPhrases(categoryKey).title}
        </h1>
        <Tabs
          className="category-home"
          items={categoryItems}
          onChange={handleOnChange}
        />
        <div className="search-box-main flex justify-between h-fit m-6 mt-1 p-1 w-[42em] border-solid border-2 rounded-full border-color-border-primary bg-white">
          <input
            className="h-8 w-full p-2 pl-6 text-base text-color-text-primary border-none rounded-full focus:outline-none"
            style={{ fontFamily: "Poppins" }}
            placeholder={getCatPhrases(categoryKey).placeHolder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />
          <span 
            className="flex items-center font-semibold text-base text-color-primary px-5 py-2.5 border-solid border border-color-primary rounded-full bg-white hover:bg-color-hover-primary cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </span>
        </div>
        <div className="mb-6">
          <span className="text-color-text-secondary">Not sure where to go? </span>
          <span 
            className="text-color-primary font-semibold cursor-pointer rcm-element"
            onClick={handleRecommend}  
          >
              Check out some fantastic places
              <span className="text-lg align-middle smooth-trans ml-1">
                <ArrowRightOutlined/>
              </span>
            </span>
        </div>

        <div className="relative w-full h-[36rem] mb-20">
          <img alt="#" src={IMAGE_PATH.HOME} 
            className="image w-full h-full object-cover object-bottom rounded-lg" 
          />
          <div className="absolute bottom-0 left-0 pb-16 px-10">
            <div className="font-bold text-[5rem] leading-none mb-4 text-amber-400">
              Explore
            </div>
            <div className="font-bold text-[3.5rem] leading-none mb-4 text-white">
              the world
            </div>
            <div className="primary-button w-fit"
              style={{ borderRadius: "99px" }}
              onClick={() => navigate(ROUTES.TRIPS_HOME)}
            >
              Plan your trip
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
