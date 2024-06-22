import { generateAddress } from "../../../utils/Utils"

export interface MapPopupItemProps {
  id: string
  name: string
  ancestors: any[]
  coordinates: number[]
  address: string[]
  image: {
    name: string
    url: string
  }
  review: {
    rate: number
    total: number
  }
  type: string
}

export default function MapPopupItem(props: MapPopupItemProps) {
  const handleOpenWindow = () => {
    window.open(`/${props.type}/${props.id}`)
  }

  return (
    <div className="w-full h-fit box-border pt-1.5 px-0.5">
      <div 
        className="flex w-full min-w-full h-28 cursor-pointer"
        onClick={handleOpenWindow}
      >
        <img alt={props.image.name} src={props.image.url} 
        className="image w-full h-full rounded object-cover object-center" />
      </div>
      <div 
        className="max-w-full text-base mt-4 font-semibold cursor-pointer hover:underline"
        style={{
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2, 
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
        onClick={handleOpenWindow}
      >
        {props.name}
      </div>
      <div className="flex text-sm text-color-extra-text-primary max-w-[14rem] mt-2">
        <i className="bi bi-geo-alt mr-1.5"/>
        <div
          style={{
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, 
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {generateAddress(props.ancestors, props.address)}
        </div>
      </div>
    </div>
  )
}