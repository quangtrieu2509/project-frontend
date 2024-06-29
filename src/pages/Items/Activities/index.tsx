import { Breadcrumb } from "antd";
import { ROUTES, keyTypes } from "../../../constants";
import Browsing from "./Browsing";
import Selecting from "../Selecting";
import { useEffect, useState } from "react";
import NotFound from "../../Static/NotFound";
import { useParams } from "react-router-dom";
import { apiCaller, locationApi } from "../../../api";
import { messages } from "../../../constants/message";
import { BreadcrumbItem } from "../../../types";

export default function Activities() {
  const [bcItems, setBcItems] = useState<BreadcrumbItem[]>([])
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const { slug } = useParams()

  useEffect(() => {
    const getBreadcrumbItems = async () => {
        const res = await apiCaller(
          locationApi.getBreadcrumb(slug ?? ""),
          (error) => {
            if (error.ec === messages.NOT_FOUND.ec) {
              setHas404Error(true)
            }
          }
        )
        
        if (res !== undefined) {
          setBcItems(res.data)
        }
    }

    getBreadcrumbItems()
  }, [slug])

  const generateBcItems = (items: BreadcrumbItem[]) => {    
    const returnedItems: any = items.map((e) => {
      return {
        title: e.name,
        href: ROUTES.TOURISM_BASE + e.slug
      }
    })
  
    returnedItems.push({
      title: `${items[items.length - 1]?.name ?? ""} Activities`
    })
  
    return returnedItems
  }

  return (
    has404Error 
    ? <NotFound/> 
    : <div className="tp-page activities-page bg-color-background-primary">
      <div className="tp-wrapper">
        <Breadcrumb
          separator=">"
          items={generateBcItems(bcItems)}
        />
        {Boolean(bcItems.length) && <h1 className="text-center">
          {`Activities in ${bcItems[bcItems.length - 1]?.name}`}
        </h1>}
        {
          bcItems.length >= 3
          ? <Browsing id={bcItems[bcItems.length - 1]?.id}/>
          : <Selecting id={bcItems[bcItems.length - 1]?.id}
              keyType={keyTypes.ACTIVITY}
            />
        }
      </div>
    </div>
  )
}