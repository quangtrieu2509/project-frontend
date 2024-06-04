import "./index.style.scss"

import { Dropdown, Modal, Skeleton, Tabs } from "antd"
import { IMAGE_PATH, ROUTES } from "../../constants"
import { BarsOutlined, PlusOutlined } from "@ant-design/icons"
import { loadingTabItems, profileActions, profileTabItems, settingActions } from "./itemLists"
import { useEffect, useState } from "react"
import { apiCaller } from "../../api"
import { userApi } from "../../api/user"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getLocalStorage } from "../../utils/Auth"
import { useDispatch, useSelector } from "react-redux"
// import { setLoaderState } from "../../redux/Loader"
import InteractModal from "../../components/Profile/InteractModal"
import { getState, setInteractModalState, setIntroInfo } from "../../redux/Profile"

interface IUserProfile {
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

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState<IUserProfile|null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("1")
  const params = useParams()
  const [queries] = useSearchParams()

  const { interactModalState } = useSelector(getState)
  const [interactTitle, setInteractTitle] = useState<string>("")
  const [interactUserList, setInteractUserList] = useState<UserOverview[]>([])

  const handleInteractUser = async (action: boolean) => {
    // dispatch(setLoaderState(true))
    await apiCaller(userApi.interactUser(params.id ?? "", action))
    // dispatch(setLoaderState(false))
    setIsFollowing(action)
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await apiCaller(userApi.getUser(params.id ?? ""))
      
      if (res !== undefined) {
        console.log("Profile data: ", res.data) 
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
        setUser(res.data)
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
  
  return (
    <div className="tp-page profile-page bg-color-background-primary">
      <div className="tp-wrapper tp-profile-wrapper">
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
                onClick={() => navigate(ROUTES.TRIPS_HOME)}
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
      </div>
      <Modal
        open={interactModalState}
        onCancel={()=>{ 
          dispatch(setInteractModalState(false)) }}
        title={interactTitle}
        centered
        footer={false}
      >
        <InteractModal userList={interactUserList} />
      </Modal>
    </div>
  )
}
