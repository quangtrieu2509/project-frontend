import { capitalize } from "../../../utils/Utils"
import { itemTypes } from "../../../constants"
import Dining from "./Dining"
import Lodging from "./Lodging"
import Attraction from "./Attraction"
import Activity from "./Activity"
import { useSelector } from "react-redux"
import { getState } from "../../../redux/Business"

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
  duration?: {
    value: number
    unit: string
  }
  ages?: number[]
  included?: string[]
  excluded?: string[]
  requirements?: string[]
}

export default function Details() {
  const selectedItem = useSelector(getState).selectedItem as DetailsItem

  const generateDetails = (detailsItem: any) => {
    switch (detailsItem.type) {
      case itemTypes.ATTRACTION: 
        return <Attraction {...detailsItem}/>
      case itemTypes.LODGING:
        return <Lodging {...detailsItem}/>
      case itemTypes.DINING:
        return <Dining {...detailsItem}/>
      case itemTypes.ACTIVITY:
        return <Activity {...detailsItem}/>
      default: 
        return <></>
    }
  }

  return (
    <div className="business-details">
      {selectedItem && <><h2 className="mt-0">{capitalize(selectedItem.type)}</h2>
        {generateDetails(selectedItem)}
      </>}
    </div>
  )
}