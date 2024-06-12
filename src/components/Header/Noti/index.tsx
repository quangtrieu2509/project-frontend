import { Badge, Drawer } from "antd";
import Notis from "../../Drawer/Notis";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage, setLocalStorage } from "../../../utils/Auth";
import { addNoti, getState, readAllNotis, setNotisList } from "../../../redux/Noti";
import { apiCaller, notiApi } from "../../../api";
import { useSocket } from "../../../hooks";

export interface INoti {
  id: string
  userId: string
  type: string
  content: string
  url: string
  isSeen: boolean
  createdAt: Date
}

export default function Noti() {
  const dispatch = useDispatch()
  const socket = useSocket()
  const [notiState, setNotiState] = useState<boolean>(false)
  const notisList = useSelector(getState).notisList as INoti[]

  useEffect(() => {
    const getNotisList = async () => {
      const res = await apiCaller(notiApi.getUnreadNotis())

      if (res !== undefined) {
        dispatch(setNotisList(res.data))
      }
    }

    getNotisList()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('noti', (noti: INoti) => {
        dispatch(addNoti(noti))
      })

      return () => {
        socket.off('noti')
      }
    }
  }, [socket])

  const handleReadAll = async () => {
    const res = await apiCaller(notiApi.readAllNotis())
    
    if (res !== undefined) {
      dispatch(readAllNotis())
      alert("Read all notifications")
    }
  }

  const handleOnClose = () => {
    setLocalStorage({ key: "latestSeen", value: Date.now().toString() })
    setNotiState(false)
  }

  const calculateNotisCount = (): number => {
    const latestSeen: number = getLocalStorage("latestSeen")
    return notisList.filter(e => 
      !e.isSeen && new Date(e.createdAt).getTime() > latestSeen
    ).length
  }

  return (
    <>
      <span 
        className="text-base font-medium text-color-text-primary px-5 py-2 mx-px rounded-full bg-transparent hover:bg-color-hover-primary cursor-pointer"
        onClick={() => setNotiState(true)}
      >
        <Badge 
          count={calculateNotisCount()} 
          overflowCount={20} offset={[4, -2]}
        >
          <i className="bi bi-bell text-xl"/>
        </Badge>
      </span>
      <Drawer
        title={<div className="flex justify-between items-center">
          <div>
            Notifications
            <span className=" text-sm ml-1">
              {`(${notisList.filter(e => !e.isSeen).length})`}
            </span>
          </div>
          <div 
            className=" text-sm font-normal underline cursor-pointer hover:text-color-extra-text-primary"
            onClick={handleReadAll}
          >
            Mark all as read
          </div>
        </div>}
        onClose={handleOnClose}
        open={notiState} destroyOnClose
        width={450}
        styles={{
          body: {
            paddingTop: "0.75rem",
          }
        }}
      >
        <Notis/>
      </Drawer>
    </>
  )
}