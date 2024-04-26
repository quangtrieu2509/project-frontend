import { Breadcrumb } from "antd";
import { ROUTES } from "../../constants";
import Browsing from "./Browsing";
import Selecting from "./Selecting";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";
import { useParams } from "react-router-dom";
import { apiCaller, locationApi } from "../../api";
import { messages } from "../../constants/message";

interface BreadcrumbItem {
  id: string
  name: string
  level: string
  slug: string
}

export default function Dinings() {
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
        
        if (res !== null) {
          setBcItems(res.data)
        }
    }

    getBreadcrumbItems()
  }, [slug])

  const generateBcItems = (items: BreadcrumbItem[]) => {
    const tmp = [...items]
    
    const returnedItems: any = tmp.reverse().map((e) => {
      return {
        title: e.name,
        href: ROUTES.TOURISM_BASE + e.slug
      }
    })
  
    returnedItems.push({
      title: `${items[0]?.name ?? ""} Dinings`
    })
  
    return returnedItems
  }

  return (
    has404Error 
    ? <NotFound/> 
    : <div className="tp-page dinings-page bg-color-background-primary">
      <div className="tp-wrapper">
        <Breadcrumb
          separator=">"
          items={generateBcItems(bcItems)}
        />
        <h1 className="text-center">
          {`Dinings in ${bcItems[0]?.name}`}
        </h1>
        {
          bcItems.length >= 3
          ? <Browsing/>
          : <Selecting/>
        }
      </div>
    </div>
  )
}