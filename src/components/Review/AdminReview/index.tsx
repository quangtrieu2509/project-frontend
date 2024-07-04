import { useDispatch } from "react-redux";
import { IMAGE_PATH } from "../../../constants";
import { formatDateTime, generateAddress, generateIconType } from "../../../utils/Utils";
import { setDetailReview } from "../../../redux/Admin";
import { Review } from "../../../pages/Admin/Reviews";
import { Rate } from "antd";

export default function AdminReview(props: Review) {
  const dispatch = useDispatch()

  const handleOpenDetail = () => {
    dispatch(setDetailReview(props))
  }

  const goToItemDetail = () => {
    window.open(`/${props.item.type}/${props.item.id}`)
  }

  // const generateSubtitle = () => {
  //   return props.state === ItemStates.PENDING ?
  //     `created at ${formatDateTime(props.createdAt, true, true)}` :
  //     `updated at ${formatDateTime(props.updatedAt, true, true)}`
  // }
  return (
    <div className="min-w-[30.5rem] text-color-text-primary border border-solid border-color-border-primary rounded-md">
      <div className="box-border px-4 py-2 bg-white rounded-[5px]">
        <div className="flex items-center mt-1 mb-2 cursor-pointer"
          onClick={handleOpenDetail}
        >
          <div className="h-10 w-10 mr-3">
            <img alt="#" src={props.user.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
              className="image h-full rounded-full object-cover object-center" 
            />
          </div>
          <div className="flex flex-col justify-between max-w-[28.5rem]">
            <div className="flex items-center">
              <span className="font-semibold cursor-pointer mr-1.5 ellipsis max-w-[15rem]">
                {`${props.user.familyName} ${props.user.givenName}`}
              </span>
              <span className="text-sm text-color-text-secondary mr-2">
                {"rated"}
              </span>
              <div>
                <Rate disabled value={props.rate}
                  className="text-color-primary text-sm z-0"
                />
              </div>
            </div>
            <div className="flex items-center text-xs text-color-text-secondary h-4">
              <span>{`created at ${formatDateTime(props.createdAt, true, true)}`}</span>
            </div>
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleOpenDetail}
          style={{
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, 
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {props.content}
        </div>
        <div className="pt-2.5 pb-1 text-xs flex justify-between">
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
          {props.images.length !== 0 && <div className="text-base h-fit rounded-md px-2 py-0.5 text-color-text-secondary bg-neutral-100">
            <i className="bi bi-images mr-1"/>
            <span>+{props.images.length}</span>
          </div>}
        </div>
      </div>
    </div>
  )
}