import "./index.style.scss"

import { Dropdown, Form, Input, message, Modal, Skeleton, Tabs } from "antd"
import { IMAGE_PATH, ROUTES } from "../../constants"
import { BarsOutlined, ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons"
import { loadingTabItems, profileActions, profileTabItems, settingActions } from "./itemLists"
import { useEffect, useState } from "react"
import { apiCaller, chatApi } from "../../api"
import { userApi } from "../../api/user"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getLocalStorage } from "../../utils/Auth"
import { useDispatch, useSelector } from "react-redux"
import InteractModal from "../../components/Profile/InteractModal"
import { getState, setInteractModalState, setIntroInfo, setUser } from "../../redux/Profile"
import { messages } from "../../constants/message"
import NotFound from "../../components/Static/NotFound"
import { seenConvo, setConvoState, setSelectedConvo } from "../../redux/Chat"
import { useDocumentTitle } from "../../hooks"
import EditProfileModal from "../../components/Drawer/EditProfileModal"
import { setTripCreationState } from "../../redux/Trip"

export interface IUserProfile {
  id: string
  profileImage: string
  familyName: string
  givenName: string
  contributions: number
  followers: string[]
  followings: string[]
}

export interface UserOverview {
  user: {
    id: string
    profileImage: string
    familyName: string
    givenName: string
    address?: string
  }
  contributions: number
  isFollowing: boolean
}

const { confirm } = Modal

export default function Profile() {
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const { user } = useSelector(getState)
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("1")
  const params = useParams()
  const [queries] = useSearchParams()
  const [form] = Form.useForm()

  const { interactModalState } = useSelector(getState)
  const [interactTitle, setInteractTitle] = useState<string>("")
  const [interactUserList, setInteractUserList] = useState<UserOverview[]>([])

  const [msgModalState, setMsgModalState] = useState<boolean>(false)

  const handleInteractUser = async (action: boolean) => {
    // dispatch(setLoaderState(true))
    await apiCaller(userApi.interactUser(params.id ?? "", action))
    // dispatch(setLoaderState(false))
    setIsFollowing(action)
  }

  const title = user ? `Profile - ${user.familyName} ${user.givenName}` : "Profile"
  useDocumentTitle(title)

  useEffect(() => {
    const getUser = async () => {
      const res = await apiCaller(
        userApi.getUser(params.id ?? ""),
        (error) => {
          if (error.ec === messages.NOT_FOUND.ec) {
            setHas404Error(true)
          }
        }
      )
      
      if (res !== undefined) {
        // console.log("Profile data: ", res.data) 
        const userId = getLocalStorage("id")
        if (res.data.id !== userId) {
          setIsOwner(false)
          const followers = res.data.followers as Array<string>
          followers.includes(userId)
          ? setIsFollowing(true)
          : setIsFollowing(false)
        } else {
          setIsOwner(true)
        } 
        dispatch(setUser(res.data))
        dispatch(setIntroInfo(res.data))
      }
    }

    getUser()
  }, [params])

  useEffect(() => {
    setActiveTab(queries.get("tab") ?? profileTabItems[0].key)
  }, [queries])

  const handleOnChange = (activeKey: string) => {
    if (activeKey === profileTabItems[0].key) navigate("")
    else navigate(`?tab=${activeKey}`, { replace: true })
  }

  const handleGetFollowers = async () => {
    // dispatch(setLoaderState(true))
    const res: any = await apiCaller(userApi.getFollowers(user?.id ?? "")) 
    // dispatch(setLoaderState(false))
    
    if (res !== undefined) {
      setInteractTitle("Followers")
      setInteractUserList(res.data)
      dispatch(setInteractModalState(true))
    }
  }

  const handleGetFollowings = async () => {
    // dispatch(setLoaderState(true))
    const res: any = await apiCaller(userApi.getFollowings(user?.id ?? "")) 
    // dispatch(setLoaderState(false))
    
    if (res !== undefined) {
      setInteractTitle("Followings")
      setInteractUserList(res.data)
      dispatch(setInteractModalState(true))
    }
  }

  const handleChat = () => {
    if (params.id) {
      apiCaller(
        chatApi.checkConvo(params.id),
        (error) => {
          if (error.ec === messages.NOT_FOUND.ec) {
            setMsgModalState(true)
          }
        }
      ).then((res) => {
        if (res !== undefined) {
          dispatch(setSelectedConvo(res.data))
          dispatch(setConvoState(true))
          dispatch(seenConvo(res.data.id))
        }
      })
    }
  }

  const handleCancelMsg = () => {
    confirm({
      title: `Are you sure to cancel?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      maskClosable: true,
      onOk () {
        setMsgModalState(false)
      }
    })
  }

  const handleSubmitForm = () => {
    const trimmed = form.getFieldValue("content").trimStart().trimEnd()
    if (Boolean(trimmed)) {
      form.setFieldValue("content", trimmed)
      form.submit()
    } else form.setFieldValue("content", undefined)
  }

  const handleOnFinish = (values: any) => {
    if (params.id) {
      confirm({
        title: `Are you sure to send this message?`,
        icon: <ExclamationCircleFilled />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          const newMessage = {
            content: values.content,
            desUserId: params.id
          }
          void apiCaller(chatApi.createMessage(newMessage))
          setMsgModalState(false)
        }
      })
    }
  }

  const handleMakeTrip = () => {
    navigate(ROUTES.TRIPS_HOME)
    dispatch(setTripCreationState(true))
  }
  
  return (
    <div className="tp-page profile-page bg-color-background-primary">
      { has404Error && user === null ? <NotFound/>
      : <div className="tp-wrapper tp-profile-wrapper">
        <div className="profile-item bg-white p-6 pb-0 flex justify-between rounded-t-lg">
          <div className="flex">
            <div className="profile-image w-28 h-28">
              {
                !user
                ? <Skeleton.Avatar active style={{ height: "7rem", width: "7rem", verticalAlign: "baseline" }}/>
                : <img alt="#" src={user.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} className="image h-full w-full rounded-full" />
              }
            </div>
            {
              !user
              ? <div className="ml-5 w-48 flex flex-col justify-center">
                <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 1, width: "inherit" }}/>
              </div>
              : <div className="profile-info flex flex-col justify-center ml-5 text-color-text-primary">
                <span className="text-2xl font-semibold mb-1.5">{user.familyName} {user.givenName}</span>
                {/* <span className="text-sm text-extraText mb-1.5">{`@${user.username}`}</span> */}
                <div className="text-sm">
                  <span className="interact-info-label">
                    <span className="interact-info-result">{user.contributions ?? 0}</span> contributions
                  </span>
                  {
                    user.followers.length > 0 ? (
                      <span
                        className="interact-info-label cursor-pointer"
                        onClick={handleGetFollowers}
                      >
                        <span className="interact-info-result">{user.followers.length}</span> followers
                      </span>
                    ) : (
                      <span className="interact-info-label">
                        <span className="interact-info-result">0</span> followers
                      </span>
                    )
                  }
                  {
                    user.followings.length > 0 ? (
                      <span
                        className="interact-info-label cursor-pointer"
                        onClick={handleGetFollowings}
                      >
                        <span className="interact-info-result">{user.followings.length}</span> followings
                      </span>
                    ) : (
                      <span className="interact-info-label">
                        <span className="interact-info-result">0</span> followings
                      </span>
                    )
                  }
                </div>
              </div>
            }
          </div>
          {
            !user
            ? <></>
            : isOwner
            ? <div className="profile-action flex items-center">
              <span 
                className="secondary-button text-sm rounded-md cursor-pointer mr-4"
                onClick={handleMakeTrip}
              >
                <PlusOutlined className="mr-1"/> Make a trip
              </span>
              <Dropdown
              menu={{ items: settingActions }}
              trigger={["click"]}
              onOpenChange={() => {}}
              >
                <i className="secondary-button text-lg bi bi-gear"
                style={{ paddingTop: "0.25rem", paddingBottom: "0.25rem" }}
                />
              </Dropdown>
            </div>
            : <div className="profile-action flex items-center">
              {
                isFollowing
                ? <span 
                    className="secondary-button text-sm mr-4"
                    onClick={() => handleInteractUser(false)}
                  >
                    Following
                  </span>
                : <span 
                    className="primary-button text-sm mr-4"
                    onClick={() => handleInteractUser(true)}
                  >
                    Follow
                  </span>
              }
              <i className="secondary-button text-lg bi bi-chat-left-dots"
                style={{ paddingTop: "0.25rem", paddingBottom: "0.25rem" }}
                onClick={handleChat}
              />
            </div>
          }
        </div>
        <div className="profile-item">
          {
            !user
            ? <Tabs className="text-sm" items={loadingTabItems}/>
            : <Tabs
              className="text-sm"
              items={profileTabItems}
              tabBarExtraContent={
                isOwner ? null
                : <Dropdown
                    menu={{ items: profileActions }}
                    trigger={["click"]}
                    onOpenChange={() => {}}
                  >
                    <BarsOutlined 
                      className="text-xl px-3 py-1 mt-6 mr-6"
                    />
                  </Dropdown>
              } 
              centered
              activeKey={activeTab}
              onChange={handleOnChange}
            />
          }
        </div>
      </div>}
      <Modal
        open={interactModalState}
        onCancel={()=>{ 
          dispatch(setInteractModalState(false)) }}
        title={interactTitle}
        centered destroyOnClose
        footer={false}
      >
        <InteractModal userList={interactUserList} />
      </Modal>
      <Modal
        open={msgModalState} 
        onCancel={handleCancelMsg}
        title={<div className="w-full flex justify-center text-lg">Start Conversation</div>}
        centered destroyOnClose
        maskClosable={false}
        footer={
          <div className="flex justify-center relative">
            <div className="secondary-button absolute left-0" 
              onClick={handleCancelMsg}
            >
              Cancel
            </div>
            <div className="primary-button"
            onClick={handleSubmitForm}
            >
              Send
            </div>
          </div>
        }
      >
        <div className="mb-2 text-color-extra-text-primary">
          Let's send a message.
        </div>
        <Form
          layout="vertical"
          form={form} onFinish={handleOnFinish}
        >
          <Form.Item
            name="content" preserve={false}
            rules={[
              { required: true, message: "This field cannot be empty" }
            ]}
          >
            <Input.TextArea 
              autoSize={{ minRows: 3, maxRows: 6 }} 
              placeholder="Leave a message here..." 
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === "Enter")
                  handleSubmitForm()
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <EditProfileModal messageApi={messageApi}/>
      {contextHolder}
    </div>
  )
}
