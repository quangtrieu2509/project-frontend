import { Image, Rate, Typography } from "antd";
import { IMAGE_PATH } from "../../../constants";
import "./index.style.scss"
import { useState } from "react";

export default function ReviewItem() {
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)

  return (
    <div className="review-item mb-4 border-solid border-0 border-b border-color-border-secondary">
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <div className="h-11 max-w-[2.75rem] mr-3">
            <img alt="#" src={IMAGE_PATH.DEFAULT_AVATAR} 
              className="image h-full rounded-full cursor-pointer" 
              // onClick={goToProfile}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="name text-base font-semibold">
              {"Duong Trieu"}
            </div>
            <div className="flex items-center text-color-text-secondary">
              <div>
                {"Hanoi"}
                <i className="bi bi-dot mx-1"/>
              </div>
              <div>{"3 contributes"}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="like font-medium mr-4">
            <i className="bi bi-hand-thumbs-up text-base mr-1 cursor-pointer"/>
            {30}
          </div>
          <div className="more">
            <i className="bi bi-three-dots text-xl cursor-pointer"/>
          </div>
        </div>
      </div>
      <div>
        <Rate disabled value={4} 
          className="text-color-primary text-base"
        />
      </div>
      <div className="flex items-center text-color-text-secondary mb-2">
        <div>
          {"April 2024"}
          <i className="bi bi-dot mx-1"/>
        </div>
        <div>{"Solo"}</div>
      </div>
      <div className="text-base break-words mb-5">
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
            expanded: paraExpanded
          }}
          className="text-base text-color-extra-text-primary poppins-font"
          onClick={() => setParaExpanded((e) => !e)}
        >
          {"This is descriptionDespite centuries of French and Chinese influence, Hanoi is a city that’s wholly (and proudly) Vietnamese. But its layered history is everywhere you look—from the Old Quarter with its French colonial buildings to the more than 600 temples and pagodas around the city. You can get right to the history of the city at sites like Hoa Lo Prison or the Ho Chi Minh Mausoleum. Take it all in by foot (or scooter), making time for detours at some of the city’s newer additions: independent art galleries, boutique shops, and trendy cafes. If you’re coming just"}
        </Typography.Paragraph>
        <span 
          className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
          onClick={() => setParaExpanded((e) => !e)}
        >
          {paraExpanded ? "Read less" : "Read more"}
        </span>
      </div>
      <div className="mb-4">
        <Image.PreviewGroup>
          <Image src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/fc/8f/0f/lake-of-the-restored.jpg?w=1400&h=500&s=1" 
            className="object-cover object-center rounded-lg"
          />
          
          <Image src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f7/12/caption.jpg?w=1400&h=500&s=1" 
            className="object-cover object-center rounded-lg"
          />
        </Image.PreviewGroup>
      </div>
    </div>
  )
}