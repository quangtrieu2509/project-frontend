import { Rate, Typography } from "antd"
import { useState } from "react"
import "./index.style.scss"

const item = {
  name: "Afternoon Grand Tour Gansett",
  review: {
    rate: 4.5,
    total: 200
  },
  type: "Tours",
  duration: "1h 15m",
  location: {
    name: "Hanoi",
    detail: "Vietnam, Asia"
  },
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/80/93/a4/caption.jpg?w=800&h=-1&s=1",
  description: "Enjoy a cruise, snorkeling, pizza, and a sunset dance party all in one trip, with afternoon departures from St. Thomas and St. John. Includes two snorkeling stops in the Virgin Islands National Park. Enjoy drinks from the bar after snorkeling and pizza from Pizza Pi in Christmas Cove. Afterwards, enjoy a sunset dance party before returning to St. John and then St. Thomas."
}


export default function ItemInTrip() {

  const [paraExpanded, setParaExpanded] = useState<boolean>(false)

  return (
    <div className="item-in-trip flex mb-8">
      <div className="relative flex w-[11.5rem] min-w-[11.5rem] h-[11.5rem]">
        <div 
          className="absolute top-0 left-0 py-2 px-3 m-1.5 bg-white rounded-full cursor-pointer shadow-lg hover-button"
          onClick={() => alert("handle unsave")}  
        >
          <i className="bi bi-bookmarks-fill text-2xl text-color-object-tertirary"/>
        </div>
        <img alt="#" src={item.image} className="image w-full h-full rounded-lg object-cover object-center" />
      </div>
      <div className="ml-4 w-full flex flex-col justify-between">
        <div className="mb-2">
          <div className="mb-2">
            <div className="text-lg font-semibold cursor-pointer hover:underline">
              {item.name}
            </div>
            <div className="flex items-center mb-2">
              <Rate 
                allowHalf 
                disabled 
                defaultValue={item.review.rate} 
                className="text-color-primary text-base mr-4"
              />
              <span className="text-sm text-color-text-secondary">{item.review.total}</span>
            </div>
            <div className="text-sm font-semibold text-color-extra-primary bg-color-extra-secondary w-fit px-2 py-0.5 rounded-md">
              {item.location.name}, {item.location.detail}
            </div>
          </div>
          <div className="text-sm text-color-text-secondary">
            {item.type}
          </div>
        </div>
        <div className="text-sm">
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
              expanded: paraExpanded
            }}
            className="text-color-text-secondary poppins-font"
          >
            {item.description}
          </Typography.Paragraph>
          <span 
            className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
            onClick={() => setParaExpanded((e) => !e)}
          >
            {paraExpanded ? "Read less" : "Read more"}
          </span>
          
        </div>

      </div>

    </div>
  )
}