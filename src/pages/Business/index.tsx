import { Empty, Tabs } from "antd";
import "./index.style.scss"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Reviews from "./Reviews";
import Bookings from "./Bookings";
import Permits from "./Permits";
import Details from "./Details";
import { apiCaller, itemApi } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { getState, setSelectedItem } from "../../redux/Business";
import { useDocumentTitle } from "../../hooks";

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
  const [activeTab, setActiveTab] = useState<string>("1")
  const params = useParams()
  const dispatch = useDispatch()
  const { selectedItem } = useSelector(getState)

  const title = selectedItem ? `Business - ${selectedItem.name}` : "Business"
  useDocumentTitle(title)

  useEffect(() => {
    setActiveTab(queries.get("tab") ?? categories[0].key)
  }, [queries])

  useEffect(() => {
    const getItem = async () => {
      const res = await apiCaller(itemApi.getBusinessItem(params.id ?? ""))

      if (res !== undefined) {
        // console.log(res.data)
        dispatch(setSelectedItem(res.data))
      }
    }

    getItem()
  }, [params])

  const handleOnChange = (activeKey: string) => {
    if (activeKey === categories[0].key) navigate("")
    else navigate(`?tab=${activeKey}`, { replace: true })
  }


  return (
    <div className="tp-page business-page">
      <div className="tp-wrapper">
        {
          selectedItem === undefined
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