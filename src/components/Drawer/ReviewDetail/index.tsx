// import "../index.style.scss"
import { Image, Rate, Typography } from "antd"
import { IMAGE_PATH, ROUTES } from "../../../constants"
import { capitalize, formatDateTime, generateAddress, generateIconType, getMonth, getYear } from "../../../utils/Utils"
import { useState } from "react"
import { Review } from "../../../pages/Admin/Reviews"

export default function ReviewDetail(props: Review) {
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)

  const goToProfile = () => {
    window.open(ROUTES.PROFILE_BASE + props.user.id)
  }

  const goToItemDetail = () => {
    window.open(`/${props.item.type}/${props.item.id}`)
  }

  return (
    <div className="text-color-text-primary">
      <div className="review-header h-10 flex mb-3.5 text-color-text-primary">
        <div className="h-10 max-w-[2.5rem] mr-3">
          <img alt="#" src={props.user.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
            className="image h-full rounded-full cursor-pointer" 
            onClick={goToProfile}
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <span className="font-semibold text-base cursor-pointer mr-1.5 hover:underline"
              onClick={goToProfile}
            >
              {`${props.user.familyName} ${props.user.givenName}`}
            </span>
            <span className="text-color-text-secondary">
              {"wrote a review"}
            </span>
          </div>
          <div className="flex items-center text-xs text-color-text-secondary h-4">
            <span>{`created at ${formatDateTime(props.createdAt, true, true)}`}</span>
          </div>
        </div>
      </div>
      <div className="review-content mb-3">
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
            className="text-sm font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
            onClick={() => setParaExpanded((e) => !e)}
          >
            {paraExpanded ? "Read less" : "Read more"}
          </span>
        </div>
        <div className="mb-4">
          <Image.PreviewGroup>
            {
              props.images.map((e, i) => (
                <Image key={i}
                  src={e.url} 
                  className="object-cover object-center rounded-lg"
                />
              ))
            }
          </Image.PreviewGroup>
        </div>
        <div className="pb-4 pt-2 text-xs">
          <div className="flex h-[4.5rem] max-w-sm w-fit border border-solid border-color-border-primary rounded">
            <div className="h-full w-[4.5rem] cursor-pointer"
              onClick={goToItemDetail}
            >
              <img alt={props.item.image.name} src={props.item.image.url} 
                className="image w-full h-full rounded-l-[3px] object-cover object-center" />
            </div>
            <div className="px-4 py-2 flex flex-col justify-between">
              <div>
                <div className="max-w-[17rem] text-sm font-semibold ellipsis cursor-pointer hover:underline"
                  onClick={goToItemDetail}
                >
                  {props.item.name}
                </div>
                <div className="flex items-center">
                  <Rate 
                    allowHalf 
                    disabled 
                    defaultValue={props.item.review.rate} 
                    className="text-color-primary text-xs mr-3"
                  />
                  <span className="text-xs text-color-text-secondary">{props.item.review.total}</span>
                </div>
              </div>
              <div className="flex items-center text-color-text-secondary">
                <i className={"mr-1.5 bi bi-" + generateIconType(props.item.type)}/>
                <div className="max-w-[16rem] ellipsis">
                  {generateAddress(props.item.ancestors, [])}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}