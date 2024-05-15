import { Image, Rate, Typography } from "antd";
import { ROUTES } from "../../../constants";
import "./index.style.scss"
import { useState } from "react";
import { capitalize, formatDate, getMonth, getYear } from "../../../utils/Utils";

interface ReviewItemProps {
  user: {
    id: string
    familyName: string
    givenName: string
    profileImage: string
    address?: string
  }
  rate: number
  travelDate: Date
  tripType: string
  content: string
  images?: Array<{
    name: string
    url: string
  }>
  createdAt: Date
  // likes: string[]
}

export default function ReviewItem(props: ReviewItemProps) {
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)

  const onNavigateToProfile = () => {
    window.open(ROUTES.PROFILE_BASE + props.user.id)
  }

  return (
    <div className="review-item mb-4 border-solid border-0 border-b border-color-border-secondary">
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <div className="h-11 max-w-[2.75rem] mr-3">
            <img alt="#" src={props.user.profileImage} 
              className="image h-full rounded-full cursor-pointer" 
              onClick={onNavigateToProfile}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="name text-base font-semibold cursor-pointer"
              onClick={onNavigateToProfile}
            >
              {`${props.user.familyName} ${props.user.givenName}`}
            </div>
            <div className="flex items-center text-color-text-secondary">
              {
                props.user.address && <div>
                  {props.user.address}
                  <i className="bi bi-dot mx-1"/>
                </div>
              }
              <div>{`created on ${formatDate(props.createdAt)}`}</div>
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
        <Rate disabled value={props.rate} 
          className="text-color-primary text-base"
        />
      </div>
      <div className="flex items-center text-color-text-secondary mb-2">
        <div>
          {`${getMonth(props.travelDate)} ${getYear(props.travelDate)}`}
          <i className="bi bi-dot mx-1"/>
        </div>
        <div>{capitalize(props.tripType)}</div>
      </div>
      <div className="text-base break-words mb-5">
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
            expanded: paraExpanded
          }}
          className="text-base text-color-extra-text-primary poppins-font"
          onClick={() => setParaExpanded((e) => !e)}
        >
          {props.content}
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
          {
            props.images?.map((e, i) => (
              <Image key={i}
                src={e.url} 
                className="object-cover object-center rounded-lg"
              />
            ))
          }
        </Image.PreviewGroup>
      </div>
    </div>
  )
}