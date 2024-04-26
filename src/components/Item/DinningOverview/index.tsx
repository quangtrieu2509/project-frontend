import { Rate } from "antd"
import "../ItemInTrip/index.style.scss"
import { ROUTES } from "../../../constants"

const item = {
  id: "abcxyz",
  name: "Monica's Mercato & Salumeria",
  review: {
    rate: 4.5,
    total: 200
  },
  types: ["Restaurants", "Coffee & Tea", "Diners"],
  mealTypes: ["Breakfast", "Brunch", "Lunch", "Dinner"],
  price: "$$",
  image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/fd/ba/eb/photo2jpg.jpg"
}


export default function DiningOverview() {

  return (
    <div className="dining-overview w-full bg-white border border-solid border-color-border-secondary rounded-lg">
      <div className="relative flex w-full min-w-[16rem] h-48">
        <div 
          className="absolute top-0 left-0 py-2 px-3 m-1.5 bg-white rounded-full cursor-pointer shadow-lg hover-button"
          onClick={() => alert("handle unsave")}  
        >
          <i className="bi bi-bookmarks text-2xl text-color-object-tertirary"/>
        </div>
        <img alt="#" src={item.image} className="image w-full h-full rounded-t-[7px] object-cover object-center" />
      </div>
      <div className="w-full flex flex-col justify-between px-3 py-1">
        <div className="mb-1">
          <div className="mb-1">
            <div 
              className="text-lg font-semibold cursor-pointer hover:underline"
              onClick={() => window.open(ROUTES.DINING_BASE + item.id)}
            >
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
            <div className="text-sm text-color-text-secondary flex">
              <div className="ellipsis max-w-[12rem]">
                {item.mealTypes.join(", ")}
              </div>
              <i className="bi bi-dot"/>
              <div>{item.price}</div>
            </div>
          </div>
          <div className="text-sm font-medium text-color-text-secondary ellipsis max-w-[14rem]">
            {item.types.join(", ")}
          </div>
        </div>

      </div>

    </div>
  )
}