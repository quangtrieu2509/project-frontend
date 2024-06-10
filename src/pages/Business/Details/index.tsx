import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiCaller, itemApi } from "../../../api"
import { capitalize } from "../../../utils/Utils"
import { itemTypes } from "../../../constants"
import Dining from "./Dining"

interface DetailsItem {
  id: string
  ownerId: string
  contacts?: {
    phoneNumber: string
    website?: string
    email?: string
  }
  type: string
  isReservable: boolean
  categories: string[]
  price?: {
    level: string
    range?: number[]
  }
  hours?: Array<{
    open: string
    close: string
  } | null>
  features?: string[]
  amenities?: string[]
  ticketPrice?: number[]
  duration?: number // time
  ages?: number[]
  included?: string[]
  excluded?: string[]
  requirements?: string[]
}

export default function Details() {
  const [item, setItem] = useState<DetailsItem>()
  const params = useParams()

  useEffect(() => {
    const getList = async () => {
      const res = await apiCaller(itemApi.getDetailsItem(params.id ?? ""))

      if (res !== undefined) {
        console.log(res.data)
        setItem(res.data)
      }
    }

    getList()
  }, [params])

  const generateDetails = (detailsItem: any) => {
    switch (detailsItem.type) {
      case itemTypes.ATTRACTION: 
        return <></>
      case itemTypes.LODGING:
        return <></>
      case itemTypes.DINING:
        return <Dining {...detailsItem}/>
      case itemTypes.ACTIVITY:
        return <></>
      default: 
        return <></>
    }
  }

  return (
    <div className="business-details">
      {item && <><h2 className="mt-0">{capitalize(item.type)}</h2>
        {generateDetails(item)}
      </>}
    </div>
  )
}