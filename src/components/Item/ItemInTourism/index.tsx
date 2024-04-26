import { Rate } from "antd"
import "../ItemInTrip/index.style.scss"

const item = {
  name: "Afternoon Grand",
  review: {
    rate: 4.5,
    total: 200
  },
  type: "Tours",
  location: {
    name: "Hanoi",
    detail: "Vietnam, Asia"
  },
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/80/93/a4/caption.jpg?w=800&h=-1&s=1"
}


export default function ItemInTourism() {

  return (
    <div className="item-in-tourism w-full">
      <div className="relative flex w-full min-w-[16rem] h-48">
        <div 
          className="absolute top-0 left-0 py-2 px-3 m-1.5 bg-white rounded-full cursor-pointer shadow-lg hover-button"
          onClick={() => alert("handle unsave")}  
        >
          <i className="bi bi-bookmarks text-2xl text-color-object-tertirary"/>
        </div>
        <img alt="#" src={item.image} className="image w-full h-full rounded-lg object-cover object-center" />
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="mb-1">
          <div className="mb-1">
            <div className="text-lg font-semibold cursor-pointer hover:underline">
              {item.name}
            </div>
            <div className="flex items-center mb-1">
              <Rate 
                allowHalf 
                disabled 
                defaultValue={item.review.rate} 
                className="text-color-primary text-base mr-4"
              />
              <span className="text-sm text-color-text-secondary">{item.review.total}</span>
            </div>
            <div className="text-sm text-color-text-secondary">
              {item.type}
            </div>
          </div>
          <div className="text-sm font-medium text-color-text-secondary">
            {item.location.name}, {item.location.detail}
          </div>
        </div>

      </div>

    </div>
  )
}