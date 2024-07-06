import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { apiCaller, reviewApi } from "../../../api"
import { useDispatch, useSelector } from "react-redux"
import { getState, removeFromReviewList, setDetailReview, setReviewList } from "../../../redux/Admin"
import NoResult from "../../../components/Profile/NoResult"
import { Drawer, message, Modal, Spin } from "antd"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { setLoaderState } from "../../../redux/Loader"
import { ReviewStates } from "../../../constants"
import AdminReview from "../../../components/Review/AdminReview"
import ReviewDetail from "../../../components/Drawer/ReviewDetail"
import { loadingMessage, successMessage } from "../../../utils/Utils"

export const reviewStates = [
  {
    key: "pending",
    label: "Pending"
  },
  {
    key: "active",
    label: "Active"
  },
  {
    key: "inactive",
    label: "Inactive"
  }
]

export interface Review {
  id: string
  user: {
    id: string
    givenName: string
    familyName: string
    profileImage: string
  }
  item: {
    id: string
    name: string
    type: string
    ancestors: any[]
    image: {
      name: string
      url: string
    }
    review: {
      rate: number
      total: number
    }
  }
  rate: number
  travelDate: Date
  tripType: string
  content: string
  images: Array<{
    name: string
    url: string
  }>
  updatedAt: Date
  createdAt: Date
  state: string
}

export default function Reviews() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [queries] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>()

  const { reviewList, detailReview } = useSelector(getState)

  useEffect(() => {
    setActiveTab(queries.get("state") ?? reviewStates[0].key)
  }, [queries])

  const handleOnChange = (activeKey: string) => {
    queries.set("state", activeKey)
    navigate(`?${queries.toString()}`)
  }

  useEffect(() => {
    dispatch(setReviewList(undefined))
    const getItems = async (state: string) => {
      const res = await apiCaller(reviewApi.getAdminReviews(state))

      if (res !== undefined) {
        console.log(res.data)
        dispatch(setReviewList(res.data))
      }
    }
    
    activeTab && getItems(activeTab)
  }, [activeTab])

  const generateTabButton = (key: string, label: string) => {
    return (
      <div 
        key={key}
        className={`h-fit py-1.5 px-3 rounded-md border border-solid bg-white hover:bg-color-hover-primary cursor-pointer 
          ${key === activeTab ? "border-color-secondary font-medium" : "border-color-border-primary"}`}
        onClick={() => handleOnChange(key)}  
      >
        {label}
      </div>
    )
  }

  const handleOnDetailClose = () => {
    dispatch(setDetailReview(undefined))
  }

  const handleChangeState = (action: string, state: string) => {
    Modal.confirm({
      title: `Are you sure to ${action} this review?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        const changeStateReview = async () => {
          dispatch(setLoaderState(true))
          const id = detailReview?.id ?? ""
          loadingMessage(messageApi, 'change')
          const res = await apiCaller(reviewApi.changeState(id, state))
          dispatch(setLoaderState(false))
          if (res !== undefined) {
            successMessage(messageApi, 'change', 'Done.')
            dispatch(removeFromReviewList(id))
            dispatch(setDetailReview(undefined))
          }
        }
        
        changeStateReview()
      }
    })
  }

  const generateButton = () => {
    const activeBtn = (
      <div className="primary-button"
        style={{ fontSize: "14px", backgroundColor: "var(--yellow-500)" }}
        onClick={() => handleChangeState("activate", ReviewStates.ACTIVE)}
      >
        Activate
      </div>
    )

    const inactiveBtn = (
      <div className="primary-button"
        style={{ fontSize: "14px",backgroundColor: "var(--red-500)" }}
        onClick={() => handleChangeState("inactivate", ReviewStates.INACTIVE)}
      >
        Inactivate
      </div>
    )

    return (
      detailReview && <div className="flex items-center gap-4">
      {
        detailReview.state === reviewStates[0].key ?
        <>{activeBtn}{inactiveBtn}</> :
        detailReview.state === reviewStates[1].key ?
        inactiveBtn :
        detailReview.state === reviewStates[2].key ?
        activeBtn : <></>
      }
      </div>
    )
  }

  return (
    <div>
      <h2 className="mt-0">Reviews</h2>
      <div className="flex gap-4 mb-6">
      {
        reviewStates.map(e => generateTabButton(e.key, e.label))
      }
      </div>
      <div>
        {
          reviewList === undefined ? 
          <div className="flex flex-col items-center py-4"><Spin/></div> :
          !reviewList.length ? <NoResult/> :
          <div className="grid grid-cols-2 gap-5">
          {
            reviewList.map((e: Review) => (
              <AdminReview key={e.id} {...e}/>
            ))
          }
          </div>
        }
      </div>
      <Drawer
        title={<div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-1.5">ID:</span>
            <span className="font-medium">{detailReview?.id ?? ""}</span>
          </div>
          {generateButton()}
        </div>}
        onClose={handleOnDetailClose}
        open={detailReview} width={550}
        destroyOnClose closeIcon={false}
      >
        {detailReview && <ReviewDetail {...detailReview}/>}
      </Drawer>
      {contextHolder}
    </div>
  )
}