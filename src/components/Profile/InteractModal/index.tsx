import { useDispatch } from "react-redux"
import { UserOverview } from "../../../pages/Profile"
import { IMAGE_PATH, ROUTES } from "../../../constants"
import { getLocalStorage } from "../../../utils/Auth"
// import { setLoaderState } from "../../../redux/Loader"
import { apiCaller } from "../../../api"
import { userApi } from "../../../api/user"
import { useNavigate } from "react-router-dom"
import { setInteractModalState } from "../../../redux/Profile"
import { useEffect, useState } from "react"

interface InteractModalProps {
  userList: UserOverview[]
}

export default function InteractModal(props: InteractModalProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userList, setUserList] = useState<UserOverview[]>([])

  useEffect(() => {
    setUserList(props.userList)
  }, [props.userList])

  const handleInteractUser = async (
    index: any, 
    userId: string, 
    action: boolean
  ) => {
    // dispatch(setLoaderState(true))
    await apiCaller(userApi.interactUser(userId, action))
    // dispatch(setLoaderState(false))
    const newList = [...userList]
    newList[index].isFollowing = action
    console.log(newList[index])
    setUserList(newList)
  }

  const handleGoToProfile = (userId: string) => {
    navigate(ROUTES.PROFILE_BASE + userId)
    dispatch(setInteractModalState(false))
  }

  return (
    <div className="interact-modal h-80 overflow-y-scroll overflow-x-hidden">
      {
        userList.map((value, index) => {
          return (
            <div key={index} className="flex items-center text-color-text-primary mb-4">
              <div 
                className="flex items-center cursor-pointer w-full"
                onClick={() => handleGoToProfile(value.user.id)}  
              >
                <div className="h-12 max-w-[3rem] mr-4">
                  <img alt="#" src={value.user.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR} 
                    className="image h-full rounded-full cursor-pointer" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className=" font-semibold">
                    {`${value.user.familyName} ${value.user.givenName}`}
                  </span>
                  <span className={`text-xs text-color-text-secondary ${value.user.address ? "" : "hidden"}`}>
                    <i className="bi bi-geo-alt-fill mr-1"/> 
                    {`${value.user.address}`}
                  </span>
                  <span className="text-xs text-color-text-secondary ">
                    <span className="font-semibold mr-0.5">{value.contributions}</span> contributions
                  </span>
                </div>
              </div>
              <div>
              {
                value.user.id === getLocalStorage("id")
                ? <></>
                : value.isFollowing
                ? <span 
                    className="secondary-button text-sm mx-2"
                    onClick={
                      () => handleInteractUser(index, value.user.id, false)
                    }
                  >
                    Following
                  </span>
                : <span 
                    className="primary-button text-sm mx-2"
                    onClick={
                      () => handleInteractUser(index, value.user.id, true)
                    }
                  >
                    Follow
                  </span>
              }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
