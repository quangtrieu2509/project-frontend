import { CloseOutlined, CommentOutlined, RightSquareOutlined, SendOutlined } from "@ant-design/icons";
import { Drawer, FloatButton, Input, Tooltip } from "antd";
import "./index.style.scss"
import { useEffect, useRef, useState } from "react";
import { formatDateTime, formatTime } from "../../utils/Utils";
import { apiCaller, chatApi } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, getState, seenConvo, setConvosList, setMessageList } from "../../redux/Chat";
import { getLocalStorage } from "../../utils/Auth";
import { useSocket } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import NoResult from "../Profile/NoResult";

const filters = ["all", "unread"]

export interface IConvo {
  id: string
  members: string[]
  latestMessage: {
    userId: string
    content: string
  }
  isSeen: Boolean
  receiver: {
    id: string
    givenName: string
    familyName: string
    profileImage: any
  }
  updatedAt: Date
}

export interface IMessage {
  id: string
  convoId: string
  userId: string
  content: string
  createdAt: Date
}

export default function Convo() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = useSocket()
  const [convoState, setConvoState] = useState<boolean>(false)
  const [selectedConvo, setSelectedConvo] = useState<IConvo>()
  const [filter, setFilter] = useState<string>(filters[0])
  const [message, setMessage] = useState<string>("")
  const list = useSelector(getState).convosList as IConvo[]
  const messageList = useSelector(getState).messageList as IMessage[]
  const id = getLocalStorage("id")

  const getConvosList = async (unread: boolean) => {
    const res = await apiCaller(chatApi.getUserConvos(unread))
    
    if (res !== undefined) {
      dispatch(setConvosList(res.data))
    }
  }

  useEffect(() => {
    getConvosList(filter === filters[1] ? true : false)
  }, [filter])

  useEffect(() => {
    const getMessageList = async (convoId: string) => {
      const res = await apiCaller(chatApi.getMessageList(convoId))
      
      if (res !== undefined) {
        dispatch(setMessageList(res.data))
      }
    }
    
    selectedConvo && getMessageList(selectedConvo.id)
  }, [selectedConvo])

  useEffect(() => {
    if (socket) {
      socket.on('message', async (newMessage: IMessage) => {
        await getConvosList(filter === filters[1] ? true : false)
        dispatch(addMessage(newMessage))
      })

      return () => {
        socket.off('message')
      }
    }
  }, [socket])

  const calculateConvosCount = (): number => {
    return list.filter(e => 
      e.latestMessage.userId !== id && !e.isSeen
    ).length
  }

  const handleOnMessBoxClose = () => {
    setSelectedConvo(undefined)
  }
  
  const handleOnConvoClose = () => {
    setConvoState(false)
    setFilter(filters[0])
    handleOnMessBoxClose()
  }

  const handleSelectedConvo = (convo: IConvo) => {
    setSelectedConvo(convo)
    dispatch(seenConvo(convo.id))
  }

  const handleSendMessage = () => {
    const trimmedMessage = message.trimStart().trimEnd()
    if (Boolean(trimmedMessage) && selectedConvo) {
      const newMessage = {
        convoId: selectedConvo.id,
        content: trimmedMessage,
        userId: id
      }
      void apiCaller(chatApi.createMessage(newMessage))
      // .then((res) => {
      //   if (res !== undefined){
      //     dispatch(addMessage(res.data))
      //     dispatch(addConvo({
      //       ...selectedConvo, 
      //       latestMessage: res.data, 
      //       isSeen: false, 
      //       updatedAt: res.data.createdAt
      //     }))
      //   }
      // })
    }
    setMessage("")
  }


  const messageEndRef = useRef<HTMLDivElement | null>(null)
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "auto" })
  }
  // Scroll to the bottom on component mount and when messageList changes
  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  return (
    <div className="convo-float-button">
      <FloatButton 
        badge={{ count: calculateConvosCount() }} 
        icon={<CommentOutlined />} 
        onClick={() => setConvoState(true)}
      />
      <Drawer
        title={<div className="flex items-center justify-between">
          <div>
            Conversations
            <span className="text-sm ml-1">
              {`(${calculateConvosCount()})`}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {selectedConvo && <div 
              className="cursor-pointer font-medium text-sm underline"
              onClick={
                () => navigate(ROUTES.PROFILE_BASE + selectedConvo.receiver.id)
              }  
            >
              <Tooltip title={`${selectedConvo.receiver.givenName} ${selectedConvo.receiver.familyName}`} 
                arrow={false} placement="topRight"
              >
                See profile
              </Tooltip>
            </div>}
            {selectedConvo && <Tooltip title="Hide chat" arrow={false} placement="topRight">
              <RightSquareOutlined 
                className="cursor-pointer"
                onClick={handleOnMessBoxClose}  
              />
            </Tooltip>}
            <Tooltip title="Close" arrow={false} placement="topRight">
              <CloseOutlined 
                className="cursor-pointer"
                onClick={handleOnConvoClose}
              />
            </Tooltip>
          </div>
        </div>}
        open={convoState} destroyOnClose
        mask={false} closeIcon={false}
        placement="bottom"
        styles={{
          body: {
            padding: 0
          }
        }}
      >
        <div className="flex h-full">
          <div className="w-80 overflow-y-scroll overflow-x-hidden">
            <div className="flex gap-2 py-2.5 px-3 sticky top-0 bg-white">
              <div 
                className="primary-outlined-button"
                style={{ 
                  borderRadius: "999px",
                  padding: "0.25rem 0.75rem", 
                  height: "fit-content",
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
                  padding: "0.25rem 0.75rem", 
                  height: "fit-content",
                  borderColor: `var(--color-${filter === filters[1] ? "secondary" : "border-primary"})` 
                }}
                onClick={() => setFilter(filters[1])}
              >
                Unread
              </div>
            </div>
            <div>
            {
              !list.length
              ? <NoResult/>
              : list.map(e => {
                const isSeen = e.latestMessage.userId === id || e.isSeen
                return (
                  <div key={e.id} 
                    className={`flex w-full box-border px-3 py-2 cursor-pointer ${e.id === selectedConvo?.id ? "bg-color-background-secondary" : "hover:bg-color-hover-primary"}`}
                    onClick={() => handleSelectedConvo(e)}
                  >
                    <div className="h-10 w-10 min-w-[2.5rem] mr-3">
                      <img alt="#" src={e.receiver.profileImage} 
                        className="image h-full rounded-full cursor-pointer object-cover object-center" 
                      />
                    </div>
                    <div className={`flex flex-col w-[13.125rem] box-border justify-center mr-2 text-color-text-${isSeen ? "secondary" : "primary"}`}>
                      <div className="flex w-full items-center justify-between">
                        <div className="max-w-[10.5rem] ellipsis font-semibold">
                          {e.receiver.givenName + " " + e.receiver.familyName}
                        </div>
                        <div className={`whitespace-nowrap pl-1 text-end text-xs ${isSeen ? "" : "text-color-primary"}`}>
                          {formatDateTime(e.updatedAt)}
                        </div>
                      </div>
                      <div className={`w-full ellipsis text-xs ${isSeen ? "" : "font-semibold"}`}>
                        {(e.latestMessage.userId === id ? "You: " : "") + e.latestMessage.content}
                      </div>
                    </div>
                    <div className="w-2.5 self-center">
                      <div className={`w-full h-2.5 rounded-full ${isSeen ? "bg-transparent" : "bg-color-primary"}`}/>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </div>
          {selectedConvo && <div className="w-[22rem] flex flex-col h-full bg-color-background-primary border-0 border-l border-solid border-color-border-secondary">
            <div className="w-full px-2 box-border flex-grow overflow-y-scroll overflow-x-hidden">
              {
                messageList.map(e => (
                  <div key={e.id} className={`flex w-full h-fit my-2 ${e.userId === id ? "justify-end" : ""}`}>
                    <Tooltip placement="left" title={formatDateTime(e.createdAt)} arrow={false}>
                      <div className={`w-fit max-w-[70%] box-border py-1.5 px-3 rounded-lg ${e.userId === id ? " bg-green-200" : " bg-neutral-200"}`}>
                        <div className="break-words whitespace-pre-wrap">
                          {e.content}
                        </div>
                        <div className="text-xs text-color-text-tertiary text-end">
                          {formatTime(e.createdAt)}
                        </div>
                      </div>
                    </Tooltip>
                  </div>

                ))
              }
              <div ref={messageEndRef}/>
            </div>
            <div className="max-h-fit">
              <div className="flex items-end py-2.5">
                <Input.TextArea 
                  className="flex-grow ml-3" autoSize={{ minRows: 1, maxRows: 3 }}
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (!e.shiftKey && e.key === "Enter")
                      handleSendMessage()
                  }}
                />
                <div className="h-8 min-w-[2.5rem] cursor-pointer text-lg flex items-center justify-center"
                  onClick={handleSendMessage}
                >
                  <SendOutlined/>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </Drawer>
    </div>
  )
}