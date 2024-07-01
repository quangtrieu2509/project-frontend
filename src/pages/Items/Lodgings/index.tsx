import { Breadcrumb } from "antd";
import NotFound from "../../Static/NotFound";
import { useEffect, useState } from "react";
import { BreadcrumbItem } from "../../../types";
import { useParams } from "react-router-dom";
import { apiCaller, locationApi } from "../../../api";
import { messages } from "../../../constants/message";
import { ROUTES, keyTypes } from "../../../constants";
import Browsing from "./Browsing";
import Selecting from "../Selecting";

export default function Lodgings() {
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
      title: `${items[items.length - 1]?.name ?? ""} Lodgings`
    })
  
    return returnedItems
  }

  return (
    <div className="tp-page lodgings-page bg-color-background-primary">
      { has404Error ? <NotFound/> 
      : <div className="tp-wrapper">
        <Breadcrumb
          separator=">"
          items={generateBcItems(bcItems)}
        />
        {Boolean(bcItems.length) && <h1 className="text-center">
          {`Lodgings in ${bcItems[bcItems.length - 1]?.name}`}
        </h1>}
        {
          bcItems.length >= 3
          ? <Browsing id={bcItems[bcItems.length - 1]?.id}/>
          : <Selecting id={bcItems[bcItems.length - 1]?.id} 
              keyType={keyTypes.LODGING}
            />
        }
      </div>}
    </div>
  )
}