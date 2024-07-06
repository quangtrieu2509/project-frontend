import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { apiCaller, itemApi } from "../../../api"
import { useDispatch, useSelector } from "react-redux"
import { getState, removeFromItemList, setDetailItem, setItemList } from "../../../redux/Admin"
import NoResult from "../../../components/Profile/NoResult"
import { Drawer, message, Modal, Spin } from "antd"
import AdminItem from "../../../components/Item/AdminItem"
import ItemDetail from "../../../components/Drawer/ItemDetail"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { setLoaderState } from "../../../redux/Loader"
import { ItemStates } from "../../../constants"
import { loadingMessage, successMessage } from "../../../utils/Utils"

export const itemStates = [
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

export interface Item {
  id: string
  owner: {
    id: string
    familyName: string
    givenName: string
    profileImage: string
  }
  ancestors: Array<{
    id: string
    name: string
    level: number
    slug: string
  }>
  name: string
  coordinates: number[]
  address?: string[]
  description: string
  images: Array<{
    name: string
    url: string
  }>
  contacts?: {
    phoneNumber: string
    website?: string
    email?: string
  }
  type: string
  isReservable: boolean
  state: string
  adminUpdatedAt: Date
  categories: string[]
  price?: {
    level: string
    range?: number[]
  }
  hours?: Array<{
    open: string
    close: string
  } | null>
  features?: string[]
  amenities?: string[]
  ticketPrice?: number[]
  duration?: {
    value: number
    unit: string
  }
  ages?: number[]
  included?: string[]
  excluded?: string[]
  requirements?: string[]
  createdAt: Date
}

export default function Items() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [queries] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>()

  const { itemList, detailItem } = useSelector(getState)

  useEffect(() => {
    setActiveTab(queries.get("state") ?? itemStates[0].key)
  }, [queries])

  const handleOnChange = (activeKey: string) => {
    queries.set("state", activeKey)
    navigate(`?${queries.toString()}`)
  }

  useEffect(() => {
    dispatch(setItemList(undefined))
    const getItems = async (state: string) => {
      const res = await apiCaller(itemApi.getAdminItems(state))

      if (res !== undefined) {
        // console.log(res.data)
        dispatch(setItemList(res.data))
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
    dispatch(setDetailItem(undefined))
  }

  const handleChangeState = (action: string, state: string) => {
    Modal.confirm({
      title: `Are you sure to ${action} this item?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        const changeStateItem = async () => {
          dispatch(setLoaderState(true))
          const id = detailItem?.id ?? ""
          loadingMessage(messageApi, 'change')
          const res = await apiCaller(itemApi.changeState(id, state))
          dispatch(setLoaderState(false))
          if (res !== undefined) {
            successMessage(messageApi, 'change', 'Done.')
            dispatch(removeFromItemList(id))
            dispatch(setDetailItem(undefined))
          }
        }
        
        changeStateItem()
      }
    })
  }

  const generateButton = () => {
    const activeBtn = (
      <div className="primary-button"
        style={{ fontSize: "14px", backgroundColor: "var(--yellow-500)" }}
        onClick={() => handleChangeState("activate", ItemStates.ACTIVE)}
      >
        Activate
      </div>
    )

    const inactiveBtn = (
      <div className="primary-button"
        style={{ fontSize: "14px",backgroundColor: "var(--red-500)" }}
        onClick={() => handleChangeState("inactivate", ItemStates.INACTIVE)}
      >
        Inactivate
      </div>
    )

    return (
      detailItem && <div className="flex items-center gap-4">
      {
        detailItem.state === itemStates[0].key ?
        <>{activeBtn}{inactiveBtn}</> :
        detailItem.state === itemStates[1].key ?
        inactiveBtn :
        detailItem.state === itemStates[2].key ?
        activeBtn : <></>
      }
      </div>
    )
  }

  return (
    <div>
      <h2 className="mt-0">Items</h2>
      <div className="flex gap-4 mb-6">
      {
        itemStates.map(e => generateTabButton(e.key, e.label))
      }
      </div>
      <div>
        {
          itemList === undefined ? 
          <div className="flex flex-col items-center py-4"><Spin/></div> :
          !itemList.length ? <NoResult/> :
          <div className="grid grid-cols-3 gap-5">
          {
            itemList.map((e: Item) => (
              <AdminItem key={e.id} {...e}/>
            ))
          }
          </div>
        }
      </div>
      <Drawer
        title={detailItem && <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-1.5">ID:</span>
            <span className="font-medium">{detailItem.id}</span>
          </div>
          {generateButton()}
        </div>}
        onClose={handleOnDetailClose}
        open={detailItem} width={600}
        destroyOnClose closeIcon={false}
      >
        {detailItem && <ItemDetail {...detailItem}/>}
      </Drawer>
      {contextHolder}
    </div>
  )
}