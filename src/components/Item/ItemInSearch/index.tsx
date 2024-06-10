import { Rate } from "antd"
import "../SavedItem/index.style.scss"
import { capitalize } from "../../../utils/Utils"
import { ROUTES, itemTypes } from "../../../constants"

interface ItemInSearchProps {
  id: string
  ancestors: any[]
  name: string
  type: string
  image: {
    name: string
    url: string
  }
  slug?: string
  categories?: string[]
  review?: {
    rate: number
    total: number
  }
}

export default function ItemInSearch(props: ItemInSearchProps) {
  const onNavigateItem = () => {
    let navStr
    switch(props.type) {
      case itemTypes.LOCATION: {
        navStr = ROUTES.TOURISM_BASE + props.slug
        break
      }
      case itemTypes.DINING: {
        navStr = ROUTES.DINING_BASE + props.id
        break
      }
      case itemTypes.LODGING: {
        navStr = ROUTES.LODGING_BASE + props.id
        break
      }
      default: {
        navStr = "404NotFound"
      }
    }
    window.open(navStr)
  }

  return (
    <div className="item-in-search w-full flex bg-white border border-solid border-color-border-secondary rounded-lg mb-3">
      <div className="relative flex w-64 min-w-[16rem] h-48">
        <img alt={props.image.name} src={props.image.url} 
          className="image w-full h-full rounded-s-[7px] object-cover object-center cursor-pointer" 
          onClick={onNavigateItem}  
        />
      </div>
      <div className="px-6 py-3 w-full flex flex-col">
        <div className="text-sm w-fit font-medium px-2 py-0.5 mb-1.5 border border-solid border-color-secondary rounded-md">
          {capitalize(props.type)}
        </div>
        <div className="mb-1">
          <div className="mb-1">
            <div 
              className="text-lg font-semibold cursor-pointer hover:underline"
              onClick={onNavigateItem}
            >
              {props.name}
            </div>
            {
              props.review && <div className="flex items-center mb-1">
                <Rate 
                  allowHalf 
                  disabled 
                  defaultValue={props.review.rate} 
                  className="text-color-primary text-base mr-4"
                />
                <span className="text-sm text-color-text-secondary">{props.review.total}</span>
              </div>
            }
            {
              props.categories && <div className="text-sm text-color-text-secondary">
                {props.categories.join("-")}
              </div>
            }
          </div>
          <div className="text-sm font-medium text-color-text-secondary">
            {props.ancestors.map(e => e.name).slice(0, 3).join(", ")}
          </div>
        </div>
      </div>
    </div>
  )
}