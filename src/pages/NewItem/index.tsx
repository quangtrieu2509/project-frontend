import { Form, GetProp, Image, Input, Modal, Select, Tabs, Upload, UploadFile, UploadProps } from "antd";
import "./index.style.scss"
import LocationSearch from "../../components/Trip/LocationSearch";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { ROUTES, categoryItems, itemTypes } from "../../constants";
import Dining from "./Dining";
import Attraction from "./Attraction";
import Lodging from "./Lodging";
import Activity from "./Activity";
import { locationToAncestors } from "../../utils/Utils";
import { apiCaller, itemApi, uploadApi } from "../../api";
import store from "../../redux/store"
import { setLoaderState } from "../../redux/Loader";
import { Map, Marker, MarkerDragEvent, NavigationControl } from "react-map-gl";
import { MAPBOX_API_KEY } from "../../configs";
import { defaultMap } from "../../redux/Map";
import Pin from "../../utils/Map";
import GeocoderControl from "../../components/GeocoderControl";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 30 }
}
const uploadButton = (
  <div className="bg-transparent border-0 cursor-pointer">
    <PlusOutlined />
    <div className="mt-1 poppins-font text-sm">Upload</div>
  </div>
)

const steps = {
  OVERVIEW: 1,
  DETAILS: 2
}

const categoriesList = categoryItems.map(e => ({
  value: e.type,
  label: <div className="flex items-center">
    <i className={`bi bi-${e.icon} text-base mr-2`}/> 
    <div>{e.singularLabel}</div>
  </div>
}))

export const onSubmit = (overviews: any, details: any) => {
  const { images, location, address, extraAddress, ...rest } = overviews
  rest.ancestors = locationToAncestors(location)
  rest.address = extraAddress ? [address, extraAddress ] : [address]

  Modal.confirm({
    title: 'Are you sure add this item?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk () {
      const handleUpdate = async () => {
        store.dispatch(setLoaderState(true))
        let res
        if (images?.length)
          res = await apiCaller(uploadApi.upLoadData(images))
        else res = { data: [] }
        if (res !== undefined) {
          const newData = { 
            ...rest,
            ...details,
            images: res.data 
          }
          res = await apiCaller(
            itemApi.createItem(newData)
          )          
          store.dispatch(setLoaderState(false))

          if (res !== undefined) {
            window.location.replace(ROUTES.SUCCESS)
          }
        }

      }
      
      handleUpdate()
    }
  })
}

export default function NewItem() {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [activeTab, setActiveTab] = useState<number>(steps.OVERVIEW)
  const [coors, setCoors] = 
    useState<{longitude: number, latitude: number}>(defaultMap)
  const [form] = useForm()

  const handleFilePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleFilesChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    form.setFieldValue('images', newFileList.map(e => e.originFileObj ? e.originFileObj : e))
    setFileList(newFileList)
  }

  const handleContinue = () => {
    console.log(form.getFieldsValue())
    setActiveTab(steps.DETAILS)
  }

  const setInitialValues = () => {
    form.resetFields()
    setFileList([])
  }

  const handleOnDragEnd = (evt: MarkerDragEvent) => {
    const newCoors = {
      longitude: evt.lngLat.lng,
      latitude: evt.lngLat.lat
    }
    setCoors(newCoors)
    form.setFieldValue('coordinates', [coors.latitude, coors.longitude])
  }

  const getCoordinates = () => {
    const co = form.getFieldValue("coordinates")
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
 
  const generateTab = (category: string) => {
    switch (category) {
      case itemTypes.ATTRACTION: 
        return <Attraction overviewForm={form} onBack={(e) => setActiveTab(e)}/>
      case itemTypes.LODGING:
        return <Lodging overviewForm={form} onBack={(e) => setActiveTab(e)}/>
      case itemTypes.DINING:
        return <Dining overviewForm={form} onBack={(e) => setActiveTab(e)}/>
      case itemTypes.ACTIVITY:
        return <Activity overviewForm={form} onBack={(e) => setActiveTab(e)}/>
      default: 
        return <></>
    }
  }

  const tabs = [
    {
      key: steps.OVERVIEW.toString(),
      disable: activeTab === steps.DETAILS,
      label: <div className="flex items-center">
        <i className="bi bi-1-circle-fill mr-2 text-xl"/>Overview
      </div>,
      children: <div className="flex">
        <Form {...formItemLayout} form={form} 
          variant="filled" className="min-w-[36rem] mr-14"
          onFinish={handleContinue}
        >
          <Form.Item 
            label="Name" name="name"
            rules={[{ required: true, message: 'This field cannot be empty' }]}
          >
            <Input placeholder="Enter a name"/>
          </Form.Item>
          <Form.Item 
            label="Category" name="category"
            rules={[{ required: true, message: 'This field cannot be empty' }]}
          >
            <Select
              style={{ width: "16rem" }}
              placeholder={"Which category is this place?"}
              options={categoriesList}
            />
          </Form.Item>
          <Form.Item
            name="location" label="Location" 
            rules={[{ required: true, message: 'Enter a location' }]}
          >
            <LocationSearch placeholder="Where is this place?"/>
          </Form.Item>
          <Form.Item 
            label="Address" name="address"
            rules={[{ required: true, message: 'This field cannot be empty' }]}
          >
            <Input placeholder="District, town,..."/>
          </Form.Item>
          <Form.Item 
            label=" " name="extraAddress"
          >
            <Input placeholder="Home number, ward, commune,... (optional)"/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'This field cannot be empty' },
              { min: 100, message: "Please enter minimum 100 characters" }
            
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter a description" minLength={100}
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
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card" accept="image/png, image/jpeg"
              fileList={fileList}
              beforeUpload={(_) => {
                return false
              }}
              onPreview={handleFilePreview}
              onChange={handleFilesChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label=" "
            name="coordinates"
          >
            <div className="flex">
              <div 
                className="secondary-button mr-5"
                onClick={setInitialValues}
              >
                Start over
              </div>  
              <div className="primary-button" 
                onClick={() => form.submit()}
              >
                Continue
              </div>
            </div>
          </Form.Item>
        </Form>
        <div className="w-full max-w-[24rem]">
          <div className="h-[70vh] w-full bg-color-background-primary rounded-lg">
            <Map
              mapboxAccessToken={MAPBOX_API_KEY}
              initialViewState={defaultMap}
              style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
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
          </div>
          <div>
            {getCoordinates()}
          </div>
        </div>
      </div>
    },
    {
      key: steps.DETAILS.toString(),
      disable: activeTab === steps.OVERVIEW,
      label: <div className="flex items-center">
        <i className="bi bi-2-circle-fill mr-2 text-xl"/>Details
      </div>,
      children: generateTab(form.getFieldValue("category"))
    }
  ]

  return (
    <div className="tp-page newitem-page">
      <div className="tp-wrapper">
        <h1>Add a place</h1>
        <Tabs
          className="text-base"
          items={tabs}
          tabPosition="top"
          activeKey={activeTab.toString()}
        />
      </div>
      <Image
        wrapperStyle={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(''),
        }}
        src={previewImage}
      />
    </div>
  )
}