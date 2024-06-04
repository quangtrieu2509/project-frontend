import { Empty, Tabs } from "antd";
import "./index.style.scss"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Reviews from "./Reviews";
import Bookings from "./Bookings";
import Permits from "./Permits";
import Details from "./Details";

const categories = [
  {
    key: "overview",
    label: "Overview",
    children: <Overview/>
  },
  {
    key: "details",
    label: "Details",
    children: <Details/>
  },
  {
    key: "reviews",
    label: "Reviews",
    children: <Reviews/>
  },
  {
    key: "bookings",
    label: "Bookings",
    children: <Bookings/>
  },
  {
    key: "permits",
    label: "Permits",
    children: <Permits/>
  }
] 

export default function Business () {
  const navigate = useNavigate()
  const [queries] = useSearchParams()
  const [itemId, setItemId] = useState<string>()
  const [activeTab, setActiveTab] = useState<string>("1")
  const params = useParams()

  useEffect(() => {
    setActiveTab(queries.get("tab") ?? categories[0].key)
  }, [queries])

  useEffect(() => {
    // check existed before assign
    setItemId(params.id)
  }, [params])

  const handleOnChange = (activeKey: string) => {
    if (activeKey === categories[0].key) navigate("")
    else navigate(`?tab=${activeKey}`, { replace: true })
  }


  return (
    <div className="tp-page business-page">
      <div className="tp-wrapper">
        {
          !itemId
          ? <Empty  className="w-full"
            description={
              <span className=" text-color-text-tertiary poppins-font">
                Select your business to manage.
              </span>
            } 
          />
          : <div>
            <Tabs
              className="text-base"
              items={categories}
              tabPosition="left"
              activeKey={activeTab}
              onChange={handleOnChange}
            />
          </div>
        }
      </div>
    </div>
  )
}