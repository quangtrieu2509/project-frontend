import { useNavigate } from "react-router-dom"
import { generateAddress } from "../../../utils/Utils"

export interface CardItemProps {
  id: string
  name: string
  ancestors: any[]
  address: string[]
  images: Array<{
    name: string
    url: string
  }>
  type: string
}

export default function CardItem(props: CardItemProps) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/${props.type}/${props.id}`)
  }

  return (
    <div className="w-fit h-fit p-4 border border-solid border-color-border-primary rounded">
      <div 
        className="flex w-56 min-w-[14rem] h-40 cursor-pointer"
        onClick={handleNavigate}
      >
        <img alt={props.images[0].name} src={props.images[0].url} 
        className="image w-full h-full rounded object-cover object-center" />
      </div>
      <div 
        className="max-w-[14rem] mt-4 font-semibold cursor-pointer hover:underline"
        onClick={handleNavigate}
      >
        {props.name}
      </div>
      <div className="flex text-sm text-color-extra-text-primary max-w-[14rem] mt-2">
        <i className="bi bi-geo-alt mr-1.5"/>
        <div>
          {generateAddress(props.ancestors, props.address)}
        </div>
      </div>
    </div>
  )
}