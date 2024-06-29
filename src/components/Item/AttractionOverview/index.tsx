import { Rate } from "antd"
import "../SavedItem/index.style.scss"
import { ROUTES, attractionTypes } from "../../../constants"
import { filterFields } from "../../../utils/Utils"
import { useDispatch } from "react-redux"
import { setSelectedId } from "../../../redux/Item"

export interface AttractionOverviewProps {
  id: string
  name: string
  categories: string[]
  ticketPrice?: number[]
  image: {
    name: string
    url: string
  }
  review: {
    rate: number
    total: number
  }
}


export default function AttractionOverview(props: AttractionOverviewProps) {
  const dispatch = useDispatch()

  const handleOpenDetail = () => {
    window.open(ROUTES.ATTRACTION_BASE + props.id)
  }
  return (
    <div className="dining-overview w-full bg-white border border-solid border-color-border-secondary rounded-lg">
      <div className="relative flex w-full min-w-[16rem] h-48">
        <div 
          className="absolute top-0 left-0 py-2 px-3 m-1.5 bg-white rounded-full cursor-pointer shadow-lg hover-button"
          onClick={() => dispatch(setSelectedId(props.id))}  
        >
          <i className="bi bi-bookmarks text-2xl text-color-object-tertirary"/>
        </div>
        <img alt={props.image.name} src={props.image.url} 
          className="image w-full h-full rounded-t-[7px] object-cover object-center cursor-pointer" 
          onClick={handleOpenDetail}  
        />
      </div>
      <div className="w-full box-border flex flex-col justify-between px-3 py-1">
        <div className="mb-1">
          <div className="mb-1">
            <div 
              className="text-lg font-semibold cursor-pointer hover:underline"
              onClick={handleOpenDetail}
            >
              {props.name}
            </div>
            <div className="flex items-center mb-1">
              <Rate 
                allowHalf 
                disabled 
                defaultValue={props.review.rate} 
                className="text-color-primary text-base mr-4"
              />
              <span className="text-sm text-color-text-secondary">{props.review.total}</span>
            </div>
            <div className="text-sm text-color-text-secondary flex">
              <div className="ellipsis max-w-[14rem]">
                {
                  (props.ticketPrice && props.ticketPrice[0] !== 0) 
                  && <div className="flex items-center">
                    <i className="pt-0.5 bi bi-ticket-perforated mr-2 text-base"/>
                    <div>{`from $${props.ticketPrice[0]}`}</div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="text-sm font-medium text-color-text-secondary ellipsis max-w-[14rem]">
            {filterFields(props.categories, attractionTypes, true).join(" - ")}
          </div>
        </div>
      </div>
    </div>
  )
}