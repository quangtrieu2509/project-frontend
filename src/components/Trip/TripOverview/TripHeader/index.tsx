import { Dropdown, Skeleton } from "antd"
import { IMAGE_PATH, ROUTES } from "../../../../constants"
import { privacies, privacyIcons } from "../../../../constants/privacies"
import { actions, ownerActions } from "../../actionLists"
import { useNavigate } from "react-router-dom"
import { formatDateTime } from "../../../../utils/Utils"
import { useEffect, useState } from "react"
import { apiCaller, tripApi } from "../../../../api"

interface Interact {
  liked: boolean
  likes: number
}
const initInteract = {
  liked: false,
  likes: 0
}

interface Header {
  id: string
  owner: {
    profileImage: string
    id: string
    familyName: string
    givenName: string
  }
  privacy: string
  createdAt: Date
  isOwner: boolean
  interact: Interact
}

interface TripHeaderProps {
  header?: Header
}

export default function TripHeader(props: TripHeaderProps) {
  const navigate = useNavigate()
  const [interact, setInteract] = useState<Interact>(initInteract)

  useEffect(() => {
    if (props.header) {
      setInteract(props.header.interact)
    }
  }, [props])

  const goToProfile = () => {
    navigate(ROUTES.PROFILE_BASE + props.header?.owner.id)
  }

  const handleLike = async () => {
    if (props.header) {
      const { liked, likes } = interact
      await apiCaller(
        tripApi.interactTrip(props.header.id, !liked)
      )

      liked
      ? setInteract({ liked: !liked, likes: likes - 1 })
      : setInteract({ liked: !liked, likes: likes + 1 })
    }
  }

  return (
    <div className="trip-header px-6 h-10 flex mb-3.5 text-color-text-primary">
      {
        !props.header
        ? <>
          <div className="h-10 max-w-[2.5rem] mr-3">
            <Skeleton.Avatar active style={{ height: "2.5rem", width: "2.5rem", verticalAlign: "baseline" }}/> 
          </div>
          <div className="w-full flex items-center">
            <Skeleton.Input active/>
          </div>
        </>
        : <>
          <div className="h-10 max-w-[2.5rem] mr-3">
            <img alt="#" src={props.header.owner.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
              className="image h-full rounded-full cursor-pointer" 
              onClick={goToProfile}
            />
          </div>
          <div className="flex flex-col justify-between w-full">
            <div>
              <span className="font-semibold cursor-pointer mr-1.5"
                onClick={goToProfile}
              >
                {`${props.header.owner.familyName} ${props.header.owner.givenName}`}
              </span>
              <span className="text-color-text-secondary">
                {"created a trip"}
              </span>
            </div>
            <div className="flex items-center text-xs text-color-text-secondary h-4">
              <span>{formatDateTime(props.header.createdAt, true, true)}</span>
              <i className="bi bi-dot mx-1"/>
              <span>
                {
                  props.header.privacy === privacies.PUBLIC ?
                  privacyIcons.PUBLIC :
                  privacyIcons.PRIVATE
                }
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
            menu={{ items: props.header.isOwner ? ownerActions : actions }}
            trigger={["click"]}
            onOpenChange={() => {}}
          >
            <i className="bi bi-three-dots text-xl cursor-pointer px-2 mb-2 mt-1 rounded-lg"/>
          </Dropdown>
        </>
      }
    </div>
  )
}