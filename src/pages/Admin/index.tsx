import { Tabs } from "antd";
import "./index.style.scss"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Locations from "./Locations";
import Places from "./Places";

const categories = [
  {
    key: "location",
    label: "Locations",
    children: <Locations/>
  },
  {
    key: "place",
    label: "Places",
    children: <Places/>
  },
  {
    key: "review",
    label: "Reviews",
    // children: <Reviews/>
  },
  // {
  //   key: "bookings",
  //   label: "Bookings",
  //   children: <Bookings/>
  // },
  // {
  //   key: "permits",
  //   label: "Permits",
  //   children: <Permits/>
  // }
] 

export default function Admin () {
  const navigate = useNavigate()
  const [queries] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("1")
  const params = useParams()

  useEffect(() => {
    setActiveTab(queries.get("tab") ?? categories[0].key)
  }, [queries])

  useEffect(() => {
    
  }, [params])

  const handleOnChange = (activeKey: string) => {
    if (activeKey === categories[0].key) navigate("")
    else navigate(`?tab=${activeKey}`, { replace: true })
  }


  return (
    <div className="tp-page admin-page">
      <div className="tp-wrapper">
        <Tabs
          className="text-base"
          items={categories}
          tabPosition="left"
          activeKey={activeTab}
          onChange={handleOnChange}
          destroyInactiveTabPane
        />
      </div>
    </div>
  )
}