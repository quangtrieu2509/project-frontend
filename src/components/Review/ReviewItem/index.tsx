import { Dropdown, Image, Rate, Typography } from "antd";
import { ROUTES } from "../../../constants";
import "./index.style.scss"
import { useEffect, useState } from "react";
import { capitalize, formatDate, getMonth, getYear } from "../../../utils/Utils";
import { getLocalStorage } from "../../../utils/Auth";
import { apiCaller, reviewApi } from "../../../api";
import Label from "../../Label";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ReviewItemProps {
  id: string
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
  likes: string[]
}

interface Interact {
  liked: boolean
  likes: number
}

export default function ReviewItem(props: ReviewItemProps) {
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const [interact, setInteract] = useState<Interact>({ liked: false, likes: 0 })

  useEffect(() => {
    const id = getLocalStorage("id")
    setInteract({ liked: props.likes.includes(id), likes: props.likes.length })
  }, [props])

  const handleLike = async () => {
    const { liked, likes } = interact
      await apiCaller(
        reviewApi.interactReview(props.id, !liked)
      )

      liked
      ? setInteract({ liked: !liked, likes: likes - 1 })
      : setInteract({ liked: !liked, likes: likes + 1 })
  }

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
          <div className="like font-medium mr-4"  onClick={handleLike}>
            <i className={`text-sm mr-2 cursor-pointer bi bi-heart${interact.liked ? "-fill text-color-object-primary" : ""}`}/>
            {interact.likes}
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
    </div>
  )
}