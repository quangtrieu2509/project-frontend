import { Dropdown, Skeleton } from "antd"
import { IMAGE_PATH, ROUTES } from "../../../../constants"
import { privacies, privacyIcons } from "../../../../constants/privacies"
import { EllipsisOutlined } from "@ant-design/icons"
import { actions, ownerActions } from "../../actionLists"
import { useNavigate } from "react-router-dom"

export default function TripHeader(
  props: {
    owner: {
      profileImage: string
      id: string
      familyName: string
      givenName: string
    } | null
    privacy: string
    createdAt: Date
    isOwner?: boolean
  }
) {
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate(ROUTES.PROFILE_BASE + props.owner?.id)
  }

  return (
    <div className="trip-header px-6 h-10 flex mb-3.5">
      <div className="h-10 max-w-[2.5rem] mr-3">
        {
          !props.owner 
          ? <Skeleton.Avatar active style={{ height: "2.5rem", width: "2.5rem", verticalAlign: "baseline" }}/> 
          : <img alt="#" src={props.owner.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
            className="image h-full rounded-full cursor-pointer" 
            onClick={goToProfile}
          />
        }
      </div>
      {
        !props.owner
        ? <div className="w-full flex items-center">
          <Skeleton.Input active/>
        </div>
        : <div className="flex flex-col justify-between w-full">
          <div>
            <span className="font-semibold cursor-pointer mr-1.5"
              onClick={goToProfile}
            >
              {`${props.owner.familyName} ${props.owner.givenName}`}
            </span>
            <span className="text-color-text-secondary">
              {"created a trip"}
            </span>
          </div>
          <div className="flex items-center text-xs text-color-text-secondary h-4">
            <span>{(new Date(props.createdAt).toDateString())}</span>
            <i className="bi bi-dot mx-1"/>
            <span>
              {
                props.privacy === privacies.PUBLIC ?
                privacyIcons.PUBLIC :
                privacyIcons.PRIVATE
              }
            </span>
          </div>
        </div>
      }
      {
        !props.owner 
        ? <></>
        : <Dropdown
              menu={{ items: props.isOwner ? ownerActions : actions }}
              trigger={["click"]}
              onOpenChange={() => {}}
              >
                <div className="h-fit text-2xl px-1 rounded-md cursor-pointer">
                  <EllipsisOutlined/>
                </div>
        </Dropdown>
      }
    </div>
  )
}