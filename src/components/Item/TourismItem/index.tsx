import { Rate } from "antd"
import "../SavedItem/index.style.scss"
import { generateAddress, generateCategories } from "../../../utils/Utils"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSelectedId } from "../../../redux/Item"

interface TourismItemProps {
  id: string
  name: string
  ancestors: any[]
  categories: string[]
  type: string
  review: {
    rate: number
    total: number
  }
  price?: {
    level: string
    range?: number[]
  }
  ticketPrice?: number[]
  image: {
    name: string
    url: string
  }
}


export default function TourismItem(props: TourismItemProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNavigateDetail = () => {
    navigate(`/${props.type}/${props.id}`)
  }

  return (
    <div className="item-in-tourism w-full">
      <div className="relative flex w-full min-w-[16rem] h-48">
        <div 
          className="absolute top-0 left-0 py-2 px-3 m-1.5 bg-white rounded-full cursor-pointer shadow-lg hover-button"
          onClick={() => dispatch(setSelectedId(props.id))}  
        >
          <i className="bi bi-bookmarks text-2xl text-color-object-tertirary"/>
        </div>
        <img alt={props.image.name} src={props.image.url} 
          className="image w-full h-full rounded-lg object-cover object-center cursor-pointer"
          onClick={handleNavigateDetail}
        />
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="mb-1">
          <div className="mb-1">
            <div className="text-lg font-semibold cursor-pointer hover:underline"
              onClick={handleNavigateDetail}
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
            <div className="text-sm text-color-text-secondary ellipsis">
              {generateCategories(props.categories, props.type).join(" - ")}
            </div>
          </div>
          <div className="text-sm font-medium text-color-text-secondary">
            {generateAddress(props.ancestors, [])}
          </div>
        </div>
      </div>
    </div>
  )
}