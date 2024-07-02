// import "../index.style.scss"
import { Dropdown, Image, Rate, Typography } from "antd"
import { IMAGE_PATH, ROUTES } from "../../../constants"
import { capitalize, formatDateTime, generateAddress, generateIconType, getMonth, getYear } from "../../../utils/Utils"
import { privacyIcons } from "../../../constants/privacies"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiCaller, reviewApi } from "../../../api"
import Label from "../../Label"
import { ExclamationCircleOutlined } from "@ant-design/icons"

interface Interact {
  liked: boolean
  likes: number
}
const initInteract = {
  liked: false,
  likes: 0
}

interface ReviewOverviewProps {
  id: string
  user: {
    id: string
    givenName: string
    familyName: string
    profileImage: string
  }
  item: {
    id: string
    name: string
    type: string
    ancestors: any[]
    image: {
      name: string
      url: string
    }
    review: {
      rate: number
      total: number
    }
  }
  interact: Interact
  rate: number
  travelDate: Date
  tripType: string
  content: string
  images?: Array<{
    name: string
    url: string
  }>
  createdAt: Date
}

export default function ReviewOverview(props: ReviewOverviewProps) {
  const navigate = useNavigate()
  const [interact, setInteract] = useState<Interact>(initInteract)
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)

  useEffect(() => {
    setInteract(props.interact)
  }, [props])

  const goToProfile = () => {
    navigate(ROUTES.PROFILE_BASE + props.user.id)
  }

  const goToItemDetail = () => {
    navigate(`/${props.item.type}/${props.item.id}`)
  }

  
  const handleLike = async () => {
    const { liked, likes } = interact
      await apiCaller(
        reviewApi.interactReview(props.id, !liked)
      )

      liked
      ? setInteract({ liked: !liked, likes: likes - 1 })
      : setInteract({ liked: !liked, likes: likes + 1 })
  }
  return (
    <div className="rounded-md pt-3.5 bg-white mb-4">
      <div className="review-header px-6 h-10 flex mb-3.5 text-color-text-primary">
        <div className="h-10 max-w-[2.5rem] mr-3">
          <img alt="#" src={props.user.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
            className="image h-full rounded-full cursor-pointer" 
            onClick={goToProfile}
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <span className="font-semibold cursor-pointer mr-1.5"
              onClick={goToProfile}
            >
              {`${props.user.familyName} ${props.user.givenName}`}
            </span>
            <span className="text-color-text-secondary">
              {"wrote a review"}
            </span>
          </div>
          <div className="flex items-center text-xs text-color-text-secondary h-4">
            <span>{formatDateTime(props.createdAt, true, true)}</span>
            <i className="bi bi-dot mx-1"/>
            <span>
              {privacyIcons.PUBLIC}
            </span>
          </div>
        </div>
        <div className="like font-medium mr-4 flex items-center">
          <i className={`text-sm mr-2 cursor-pointer p-1 bi bi-heart${interact.liked ? "-fill text-color-object-primary" : ""}`}
            onClick={handleLike}
          />
          <div>{interact.likes}</div>
        </div>
        <Dropdown
          menu={{ items: [
            {
              key: "1",
              label: <Label title="Report this review" icon={<ExclamationCircleOutlined/>}/>,
            }
          ] }}
          trigger={["click"]}
          onOpenChange={() => {}}
        >
          <i className="bi bi-three-dots text-xl cursor-pointer px-2 mb-2 mt-1 rounded-lg"/>
        </Dropdown>
      </div>
      <div className="review-content px-6 mb-3">
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
              props.images?.map((e, i) => (
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