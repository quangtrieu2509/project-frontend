import { Carousel, Drawer, Form, Modal, Typography } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Location } from "../../../pages/Admin/Locations"
import { ROUTES } from "../../../constants"
import { Map, Marker, NavigationControl } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../configs"
import { Pin } from "../../../utils/Map"
import { getState, setEditLocState } from "../../../redux/Admin"
import { ExclamationCircleFilled } from "@ant-design/icons"
import EditLocForm from "../../Form/EditLocForm"

interface LocationDetailProps extends Location {}

export default function LocationDetail(props: LocationDetailProps) {
  const dispatch = useDispatch()
  const [paraExpanded, setParaExpanded] = useState<boolean>(false)
  const { editLocState } = useSelector(getState)
  const [editLocForm] = Form.useForm()

  const handleOnEditLocClose = () => {
    Modal.confirm({
      title: 'Are you sure to cancel?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () { dispatch(setEditLocState(false)) }
    })
  }

  const handleSubmitEditLoc = () => {
    Modal.confirm({
      title: 'Are you sure to update?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () { editLocForm.submit() }
    })
  }

  const generateCarouselImg = (images: any[]) => {
    return images.map((image, index) => {
      return (
        <div key={index}>
          <img alt={image.name} src={image.url} 
            className="image w-full h-52 object-cover object-center" 
          />
        </div>
      )
    })
  }
  return (
    <>
    <div className="itinerary-item-detail">
      <div>
        <Carousel autoplay fade>
          {generateCarouselImg(props.images)}
        </Carousel>
      </div>
      <div className="my-4">
        <div className="text-2xl font-bold cursor-pointer hover:underline mb-2"
          onClick={() => window.open(ROUTES.TOURISM_BASE + props.slug)}
        >
          {props.name}
        </div>
        <div className="text-sm font-semibold text-color-extra-primary bg-color-extra-secondary w-fit px-2 py-0.5 rounded-md mb-2">
          {props.ancestors.map(e => e.name).slice(0, 2).join(", ")}
        </div>
      </div>
      <div className="text-sm mb-5">
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
            expanded: paraExpanded
          }}
          className="text-color-text-secondary poppins-font"
        >
          {props.description}
        </Typography.Paragraph>
        <span 
          className="font-semibold underline text-color-text-secondary cursor-pointer hover:text-color-text-tertiary"
          onClick={() => setParaExpanded((e) => !e)}
        >
          {paraExpanded ? "Read less" : "Read more"}
        </span>
      </div>
      <div className="h-px w-full bg-color-border-secondary"/>
      <div>
        <div className="text-color-text-primary font-semibold text-base my-2">Coordinates</div>
        <div className="h-60 bg-color-primary mb-4">
          <Map
            mapboxAccessToken={MAPBOX_API_KEY}
            initialViewState={{
              longitude: props.coordinates[1],
              latitude: props.coordinates[0],
              zoom: props.level + 4
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            attributionControl={false} 
          > 
            <NavigationControl position="bottom-right"/>
            <Marker offset={[0, -15]}
              longitude={props.coordinates[1]} 
              latitude={props.coordinates[0]}
            >
              <Pin/>
            </Marker>
          </Map>
        </div>
      </div>
    </div>
    <Drawer
      title={"Edit location"}
      onClose={handleOnEditLocClose} maskClosable={false}
      open={editLocState} width={500} destroyOnClose
      footer={
        <div className="flex justify-between p-3">
          <div className="secondary-button" 
            onClick={handleOnEditLocClose}
          >
            Cancel
          </div>
          <div className="primary-button"
            onClick={handleSubmitEditLoc}
          >
            Update location
          </div>
        </div>
      }
    >
      <EditLocForm form={editLocForm}/>
    </Drawer>
    </>
  )
}