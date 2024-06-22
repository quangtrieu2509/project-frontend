import { useEffect, useState } from "react"
import { getState, readNoti, setNotisList } from "../../../redux/Noti"
import { useDispatch, useSelector } from "react-redux"
import NoResult from "../../Profile/NoResult"
import { notiIcons } from "../../../constants/noti-types"
import { formatDateTime } from "../../../utils/Utils"
import parser from "html-react-parser"
import { apiCaller, notiApi } from "../../../api"
import { INoti } from "../../Header/Noti"

const filters = ["all", "unread"]

export default function NotisList() {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState<string>(filters[0])
  const notisList: INoti[] = useSelector(getState).notisList 

  useEffect(() => {
    const getNotisList = async () => {
      let res
      if (filter === filters[1]) {
        res = await apiCaller(notiApi.getUnreadNotis())
      } else res = await apiCaller(notiApi.getAllNotis())

      if (res !== undefined) {
        dispatch(setNotisList(res.data))
      }
    }

    getNotisList()
  }, [filter])

  const handleClickNoti = (noti: INoti) => {
    dispatch(readNoti(noti.id))
    apiCaller(notiApi.readNoti(noti.id))
    // handle to url
  }

  return (
    <div>
      <div className="flex gap-2 py-4 sticky top-0 bg-white">
        <div 
          className="primary-outlined-button"
          style={{ 
            borderRadius: "999px", 
            borderColor: `var(--color-${filter === filters[0] ? "secondary" : "border-primary"})` 
          }}
          onClick={() => setFilter(filters[0])}
        >
          All
        </div>
        <div 
          className="primary-outlined-button"
          style={{ 
            borderRadius: "999px", 
            borderColor: `var(--color-${filter === filters[1] ? "secondary" : "border-primary"})` 
          }}
          onClick={() => setFilter(filters[1])}
        >
          Unread
        </div>
      </div>
      <div>
      {
        !notisList.length
        ? <NoResult/>
        : notisList.map(e => (
          <div key={e.id} 
            className="flex p-3 cursor-pointer hover:bg-color-hover-primary rounded-lg"
            onClick={() => handleClickNoti(e)}
          >
            <div className=" h-14 min-w-[3.5rem] mr-4 flex justify-center items-center border border-solid border-color-border-secondary rounded-full">
              {notiIcons[e.type]}
            </div>
            <div className={`flex flex-col w-full justify-center mr-4 text-color-text-${e.isSeen ? "tertiary" : "primary"}`}>
              <div style={{
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, 
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                 {parser(e.content)}
              </div>
              <div className={`text-xs ${e.isSeen ? "" : "text-color-primary"}`}>
                {formatDateTime(e.createdAt)}
              </div>
            </div>
            <div className="self-center">
              <div className={`w-2.5 h-2.5 rounded-full ${e.isSeen ? "bg-transparent" : "bg-color-primary"}`}/>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}