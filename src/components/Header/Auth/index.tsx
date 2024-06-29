import { useEffect, useState } from "react"
import { Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"

import { getState, setView, setState } from "../../../redux/Auth"
import { AuthView } from "../../../redux/Auth/types"
import { getLocalStorage } from "../../../utils/Auth"
import Dropdown from "../Dropdown"
import { ItemType } from "antd/es/menu/interface"

interface AuthProps {
  itemsList: ItemType[]
}

export default function Auth(props: AuthProps) {
  const [hasUser, setHasUser] = useState(false)
  const currentState = useSelector(getState).state
  const currentView = useSelector(getState).view
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token !== null) setHasUser(true)
    else setHasUser(false)
  }, [])

  const handleOk = () => {
    dispatch(setState(false))
  }

  const handleCancel = () => {
    dispatch(setState(false))
  }

  const showSigninModal = () => {
    dispatch(setState(true))
    dispatch(setView(AuthView.SIGNIN))
  }

  return (
    <div className="flex justify-center items-center">
      {!hasUser ? (
        <div>
          <span
            className="font-semibold text-base text-color-text-primary px-4 py-2 ml-1 border-2 border-solid border-color-secondary rounded-lg bg-transparent hover:bg-color-hover-primary cursor-pointer"
            onClick={showSigninModal}
          >
            Sign in
          </span>
          <Modal
            footer={
              <div
                className="auth-footer mb-1"
                style={{ fontFamily: "Poppins" }}
              >
                <p className="text-xs text-color-text-secondary text-center px-7 m-0">
                  By proceeding, you agree to our{" "}
                  <u className="cursor-pointer">Terms of Use</u> and confirm
                </p>
                <p className="text-xs text-color-text-secondary text-center px-7 m-0">
                  you have read our{" "}
                  <u className="cursor-pointer">Privacy and Cookie Statement</u>
                  .
                </p>
              </div>
            }
            open={currentState}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"fit-content"}
            centered
          >
            {currentView}
          </Modal>
        </div>
      ) : (
        <div>
          <Dropdown 
            menuItems={props.itemsList}
            name="User"
            customChild={
              <div className="header-item flex h-11 min-w-[2.75rem] ml-1 rounded-full cursor-pointer">
                <img
                  id="avatar-img"
                  alt="#"
                  src={getLocalStorage("profileImage")}
                  className="image h-full rounded-full"
                />
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}
