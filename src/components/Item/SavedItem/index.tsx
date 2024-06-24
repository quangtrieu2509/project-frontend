import { Form, Input, Modal, Rate, Typography } from "antd"
import { useState } from "react"
import "./index.style.scss"
import { apiCaller, tripApi } from "../../../api"
import { useDispatch } from "react-redux"
import { removeSavedItem, updateSavesList } from "../../../redux/Trip"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { ROUTES } from "../../../constants"
import { setPopupContent } from "../../../redux/Map"
import { generateCategories } from "../../../utils/Utils"

export interface SavedItemProps {
  id: string
  tripId: string
  item: {
    id: string
    name: string
    ancestors: any[]
    coordinates: number[]
    address: string[]
    categories: string[]
    description: string
    review: {
      rate: number
      total: number
    }
    type: string
    isReservable: boolean
    image: {
      name: string
      url: string
    }
  }
  note?: string
}

export default function SavedItem(props: SavedItemProps) {
  const dispatch = useDispatch()
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const [modalState, setModalState] = useState<boolean>(false)
  const [form] = Form.useForm()

  const handeOpenModal = () => {
    setModalState(true)
  }

  const handleCancel = () => {
    setModalState(false)
  }

  const handleOnFinish = async (value: any) => {
    if (value.note !== props.note) {
      const res = await apiCaller(
        tripApi.updateSavedItem(props.id, { note: value.note })
      )
  
      if (res !== undefined) {
        dispatch(updateSavesList({ ...props, note: value.note }))
      }
    }
    setModalState(false)
  }

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure remove this item?',
      icon: <ExclamationCircleFilled />,
      content: <>
        <span className="font-semibold">{props.item.name}</span> will be removed from your saves.
      </>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const handleRemove = async () => {
          const res = await apiCaller(tripApi.removeItemFromTrip(props.id))

          if (res !== undefined) {
            alert("Removed Item")
            dispatch(removeSavedItem(props.id))
          }
        }

        handleRemove()
      }
    })
  }

  const handleOnMouseEnter = () => {
    props.item.coordinates.length && dispatch(setPopupContent(props.item))
  }

  const handleOnMouseLeave = () => {
    props.item.coordinates.length && dispatch(setPopupContent(undefined))
  }

  return (
    <>
    <div className="item-in-trip flex mb-7"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="relative flex w-[11.5rem] min-w-[11.5rem] h-[11.5rem]">
        <div 
          className="absolute top-0 left-0 py-2 px-3 m-1.5 bg-white rounded-full cursor-pointer shadow-lg hover-button"
          onClick={showDeleteConfirm}  
        >
          <i className="bi bi-bookmarks-fill text-2xl text-color-object-tertirary"/>
        </div>
        <img alt="#" src={props.item.image.url} className="image w-full h-full rounded-lg object-cover object-center" />
      </div>
      <div className="ml-4 w-full flex flex-col justify-between">
        <div className="mb-2">
          <div className="relative mb-2">
            <div className="text-lg font-semibold cursor-pointer hover:underline"
              onClick={() => window.open(`/${props.item.type}/${props.item.id}`)}
            >
              {props.item.name}
            </div>
            <div className="flex items-center mb-2">
              <Rate 
                allowHalf 
                disabled 
                defaultValue={props.item.review.rate} 
                className="text-color-primary text-base mr-4"
              />
              <span className="text-sm text-color-text-secondary">{props.item.review.total}</span>
            </div>
            <div className="text-sm font-semibold text-color-extra-primary bg-color-extra-secondary w-fit px-2 py-0.5 rounded-md">
              {props.item.ancestors.map(e => e.name).slice(0, 2).join(", ")}
            </div>
            {props.item.isReservable && <div className="secondary-button absolute bottom-0 right-0"
              style={{ borderRadius: "999px", background: "var(--color-button-tertiary)" }}
              onClick={() => window.open(ROUTES.BOOKING_BASE + props.item.id)}
            >
              Reserve
            </div>}
          </div>
          <div className="text-sm text-color-text-secondary">
            {generateCategories(props.item.categories, props.item.type).join(" - ")}
          </div>
        </div>
        <div className="text-sm mb-2">
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
              expanded: paraExpanded
            }}
            className="text-color-text-secondary poppins-font"
          >
            {props.item.description}
          </Typography.Paragraph>
          <span 
            className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
            onClick={() => setParaExpanded((e) => !e)}
          >
            {paraExpanded ? "Read less" : "Read more"}
          </span>
        </div>
        <div className="text-sm pt-1 flex justify-between border-0 border-t border-solid border-color-border-secondary">
          <div>
            <span className="font-medium text-color-extra-text-primary mr-1.5">Note:</span>
            {
              props.note
              ? <span className="text-color-text-secondary">
                {props.note}
              </span>
              : <span className=" text-color-extra-text-secondary">Write a note...</span>
            }
          </div>
          <div 
            className="secondary-button h-fit"
            style={{ borderRadius: "999px", padding: "0.25rem 0.75rem" }}
            onClick={handeOpenModal}  
          >
            <i className="bi bi-pencil-square text-color-text-primary align-middle"/>
          </div>
        </div>
      </div>
    </div>
    <Modal
      open={modalState}
      onCancel={handleCancel}
      title={
        <div className="w-full text-lg flex justify-center">
          <span className="w-96 text-center ellipsis">
            {props.item.name}
          </span>
        </div>
      }
      centered destroyOnClose
      maskClosable={false}
      footer={
        <div className="flex justify-center relative">
          <div className="secondary-button absolute left-0" 
            onClick={handleCancel}
          >
            Cancel
          </div>
          <div className="primary-button"
          onClick={() => {
            form.submit()
          }}
          >
            Save
          </div>
        </div>
      }
    >
      <div className="mb-2 text-color-extra-text-primary">
        Add some notes to remind you later.
      </div>
      <Form
        layout="vertical" preserve={false}
        form={form} onFinish={handleOnFinish}
      >
        <Form.Item
          name="note"
          label={
            <div className="flex">
              <div className="text-base font-semibold mr-1">Note</div>
              <div className="text-color-text-tertiary">(optional)</div>
            </div>
          }
          initialValue={props.note}
        >
          <Input.TextArea rows={3} placeholder="Ex: I will come at 11am for lunch,..." />
        </Form.Item>
      </Form>
    </Modal>
    </>
  )
}