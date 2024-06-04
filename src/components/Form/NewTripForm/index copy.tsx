import { Button, DatePicker, Form, Input, Modal, Select, Tabs } from "antd";
import "./index.style.scss"
import TextArea from "antd/es/input/TextArea";
import { privacyIcons } from "../../../constants/privacies";
import Destinations, { Destination } from "../../Trip/Destinations";
import { getState, setAddedDest, setCreateDestinations, setCreatePrivacy, setDestInfo } from "../../../redux/Trip/index copy";
import { useDispatch, useSelector } from "react-redux";
import { MAPBOX_API_KEY } from "../../../configs";
import { GeolocateControl, Map, Marker, NavigationControl, Popup } from "react-map-gl";
import GeocoderControl from "../../GeocoderControl";
import { useMemo } from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Pin from "../../../utils/Pin";
import axiosClient from "../../../api/axiosClient";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";

const { RangePicker } = DatePicker;


const tabItems = [
  {
    label: "Destinations",
    key: "1",
    children: <Destinations/>,
  }
]

type Props = {
  isOpen?: boolean;
  onChangeState: (newState: boolean) => void;
};

export default function TripCreation2(props: Props) {
  const privacy = useSelector(getState).create.privacy
  const dests = useSelector(getState).create.destinations as Destination[]
  const { destInfo, addedDest } = useSelector(getState)
  const dispatch = useDispatch()

  const handleChangePrivacy = (value: string) => {
    dispatch(setCreatePrivacy(value))
  }

  const pins = useMemo(
    () =>
      dests.map((dest, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={dest.coordinates[0]}
          latitude={dest.coordinates[1]}
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            dispatch(setAddedDest({ info: dest, position: index }))
          }}
        >
          <Pin/>
        </Marker>
      )),
    [dests]
  )

  const handleAddToTrip = () => {
    dispatch(setCreateDestinations([...dests, { ...destInfo, description: "" }]))
    dispatch(setDestInfo(null))
  }

  const handleRemoveFromTrip = () => {
    const index = addedDest.position
    dispatch(
      setCreateDestinations(
        [...dests.slice(0, index), ...dests.slice(index + 1)]
      )
    )
    dispatch(setAddedDest({ info: null, position: 0 }))
  }

  const handleFinish = async (value: any) => {
    const data = { ...value, privacy, destinations: dests }
    const res = await apiCaller(tripApi.createTrip(data))

    if (res !== undefined) {
      alert("Done!")
      props.onChangeState(false)
    }
  }

  return (
    <div>
      <Modal
        className="trip-creation"
        open={props.isOpen}
      // onOk={handleOk}
        onCancel={()=>{props.onChangeState(false)}}
        title={"Create Trip"}
        width={"80%"}
        centered
        footer={
          <>
            <div>
              <span className="mr-2">Privacy:</span>
              <Select
                defaultValue={privacy}
                style={{ width: "fit-content" }}
                onChange={handleChangePrivacy}
                options={[
                  { value: 'public', label: privacyIcons.PUBLIC },
                  { value: 'private', label: privacyIcons.PRIVATE }
                ]}
              />
            </div>
            <Button 
              form="trip-creation-form" 
              htmlType="submit" 
              className="primary-form-button"
            >
              Create
            </Button>
            <div className=" w-24"></div>
          </>
        }
      >
        <div className="flex h-full" >
          <div className="w-[55%] pr-2 overflow-y-scroll overflow-x-hidden">
            <Form
              id="trip-creation-form"
              layout={"vertical"}
              initialValues={{ remember: true }}
              style={{ fontFamily: "Poppins" }}
              onFinish={handleFinish}
            >
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Title",
                  }
                ]}
                label="Title"
              >
                <Input placeholder="Input trip title"/>
              </Form.Item>
              <Form.Item label="Description" name="description">
                <TextArea rows={3} placeholder="What's this trip about?"/>
              </Form.Item>
              <Form.Item label="Date of trip" name="date">
                <RangePicker />
              </Form.Item>
              
              <Tabs
                className="font-semibold"
                items={tabItems}
              />
            </Form>
          </div>
          <div className="w-[45%]">
            <Map
              mapboxAccessToken={MAPBOX_API_KEY}
              initialViewState={{
                longitude: 105.853333,
                latitude: 21.028333,
                zoom: 8
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              attributionControl={false}
            >

              <NavigationControl position="bottom-right"/>
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                position="bottom-right"
              />
              <GeocoderControl mapboxAccessToken={MAPBOX_API_KEY} position="top-left" />

              {pins}

              {destInfo && (
                <Popup
                  anchor="top"
                  longitude={destInfo.coordinates[0]}
                  latitude={destInfo.coordinates[1]}
                  onClose={() => dispatch(setDestInfo(null))}
                  style={{ fontFamily: "Poppins" }}
                >
                  <div className=" text-sm font-semibold my-1">{destInfo.text}</div>
                  <div className="mb-2">{destInfo.placeName}</div>
                  <Button className="extra-form-button w-full" onClick={handleAddToTrip}>
                    <PlusCircleOutlined/>Add to trip
                  </Button>
                </Popup>
              )}

              {addedDest.info && (
                <Popup
                  anchor="top"
                  longitude={addedDest.info.coordinates[0]}
                  latitude={addedDest.info.coordinates[1]}
                  onClose={
                    () => dispatch(setAddedDest({ info: null, position: 0 }))
                  }
                  style={{ fontFamily: "Poppins" }}
                >
                  <div className=" text-sm font-semibold my-1">{addedDest.info.text}</div>
                  <div className="mb-2">{addedDest.info.placeName}</div>
                  <Button className="extra-form-button w-full" onClick={handleRemoveFromTrip}>
                    <MinusCircleOutlined/>Remove
                  </Button>
                </Popup>
              )}
                    
            </Map>
          </div>
        </div>
      </Modal>
    </div>
  )
}