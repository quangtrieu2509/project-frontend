import { Form, Input, UploadFile, UploadProps } from "antd"
import { useDispatch } from "react-redux"
import { Map, Marker, MarkerDragEvent, NavigationControl } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../configs"
import { defaultMap } from "../../../redux/Map"
import GeocoderControl from "../../GeocoderControl"
import { Pin } from "../../../utils/Map"
import { useState } from "react"
import UploadFiles from "../../UploadFiles"
import { setLoaderState } from "../../../redux/Loader"
import { apiCaller, locationApi, uploadApi } from "../../../api"
import { setLocList, setNewLocState } from "../../../redux/Admin"

interface NewLocFormProps {
  form: any
  event?: (loc: any) => void
  ancestors: any[]
}

export default function NewLocForm(props: NewLocFormProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const dispatch = useDispatch()
  const [coors, setCoors] = 
  useState<{longitude: number, latitude: number}>(defaultMap)

  const handleFilesChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    props.form.setFieldValue('images', newFileList.map(e => e.originFileObj ? e.originFileObj : e))
    setFileList(newFileList)
  }

  const handleOnDragEnd = (evt: MarkerDragEvent) => {
    const newCoors = {
      longitude: evt.lngLat.lng,
      latitude: evt.lngLat.lat
    }
    setCoors(newCoors)
    props.form.setFieldValue('coordinates', [coors.latitude, coors.longitude])
  }

  const handleOnFinish = async (value: any) => {
    const tmpAnc = [...props.ancestors]
    value.ancestors = tmpAnc.reverse()
    value.level = props.ancestors.length + 1
    console.log(value)
    
    dispatch(setLoaderState(true))
    let res
    if (value.images.length)
      res = await apiCaller(uploadApi.upLoadData(value.images))
    else res = { data: [] }
    if (res !== undefined) {
      const newData = { 
        ...value,
        images: res.data 
      }
      res = await apiCaller(
        locationApi.createLocation(newData)
      )          
      dispatch(setLoaderState(false))

      if (res !== undefined) {
        dispatch(setNewLocState(false))
        dispatch(setLocList(res.data))
        props.event?.(res.data)
      }
    }
  }

  const getCoordinates = () => {
    const co = props.form.getFieldValue("coordinates")
    return (
      <>
        <div className="mt-2 mb-1 text-sm font-medium text-red-500">
          Drag the pin to set your location!
        </div>
        {co && <div className="my-1 text-sm font-medium">
          <div>
            <span className="font-semibold mr-2">Longitude:</span>
            <span>{co[1]}</span>
          </div>
          <div>
            <span className="font-semibold mr-2">Latitude:</span>
            <span>{co[0]}</span>
          </div>
        </div>}
      </>
    )
  }
  return (
    <div>
      <Form layout="vertical" form={props.form} onFinish={handleOnFinish} preserve={false}>
        <Form.Item
          name="name"
          label="Location name"
          rules={[{ required: true, message: "This field cannot be empty" }]}
        >
          <Input placeholder="Enter a name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'This field cannot be empty' },
            { min: 100, message: "Please enter minimum 100 characters" }
          
          ]}
        >
          <Input.TextArea rows={4} placeholder="Describe about this place..." minLength={100}
          showCount={
            { formatter: (info: { value: string, count: number}) => (
              <div>
                {info.count}/100 min characters
              </div>
            ) }
          }
          />
        </Form.Item>
        <Form.Item
          name="images" label="Images"
          rules={[
            { required: true, message: 'This field cannot be empty' },
          ]}
        >
          <UploadFiles fileList={fileList} filesMax={3} 
            handleFilesChange={handleFilesChange}
          />
        </Form.Item>
        <Form.Item
          name="coordinates"
          label="Coordinates"
          rules={[
            { required: true, message: '' },
          ]}
        >
          <div className="h-72 w-full bg-color-background-primary rounded-lg">
            <Map
              mapboxAccessToken={MAPBOX_API_KEY}
              initialViewState={defaultMap}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              attributionControl={false} 
            > 
              <GeocoderControl mapboxAccessToken={MAPBOX_API_KEY} position="top-left" />
              <NavigationControl position="bottom-right"/>
              <Marker {...coors} draggable offset={[0, -15]}
                onDragEnd={handleOnDragEnd}
              >
                <Pin/>
              </Marker>
            </Map>
            <div className="pb-4">
              {getCoordinates()}
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}