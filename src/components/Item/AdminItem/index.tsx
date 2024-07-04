import { useDispatch } from "react-redux";
import { IMAGE_PATH, ItemStates } from "../../../constants";
import { Item } from "../../../pages/Admin/Items";
import { formatDateTime, generateAddress, generateIconType } from "../../../utils/Utils";
import { setDetailItem } from "../../../redux/Admin";

export default function AdminItem(props: Item) {
  const dispatch = useDispatch()

  const handleOpenDetail = () => {
    dispatch(setDetailItem(props))
  }

  const generateSubtitle = () => {
    return props.state === ItemStates.PENDING ?
      `created at ${formatDateTime(props.createdAt, true, true)}` :
      `updated at ${formatDateTime(props.adminUpdatedAt, true, true)}`
  }
  return (
    <div className="min-w-[19.875rem] text-color-text-primary border border-solid border-color-border-primary rounded-md">
      <div className="relative h-40">
        <div className="absolute top-0 left-0 h-11 w-11 m-1.5 bg-white rounded-full shadow-lg flex items-center justify-center">
          <i className={"text-2xl text-color-primary bi bi-" + generateIconType(props.type)}/>
        </div>
        <img alt={props.images[0].name} src={props.images[0].url} 
          className="image w-full h-full rounded-t-[5px] object-cover object-center cursor-pointer"
          onClick={handleOpenDetail}
        />
      </div>
      <div className="box-border px-4 py-2 bg-white rounded-b-[5px]">
        <div className="w-full ellipsis font-semibold text-lg mb-1 cursor-pointer hover:underline"
          onClick={handleOpenDetail}
        >
          {props.name}
        </div>
        <div className="flex items-center text-sm text-color-text-secondary mb-4">
          <i className="bi bi-geo-alt mr-1.5"/>
          <div>
            {generateAddress(props.ancestors, [])}
          </div>
        </div>
        <div className="flex items-center mb-1">
          <div className="h-10 w-10 mr-3">
            <img alt="#" src={props.owner.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
              className="image h-full rounded-full object-cover object-center" 
            />
          </div>
          <div className="flex flex-col justify-between max-w-[14.5rem]">
            <div className="font-semibold ellipsis">
              {`${props.owner.familyName} ${props.owner.givenName}`}
            </div>
            <div className="flex items-center text-xs text-color-text-secondary h-4">
              <span>{generateSubtitle()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}