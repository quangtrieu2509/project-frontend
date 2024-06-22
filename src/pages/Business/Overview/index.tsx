import { Form, GetProp, Image, Input, Modal, Upload, UploadFile, UploadProps } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LocationSearch from "../../../components/Trip/LocationSearch"
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons"
import { apiCaller, itemApi, uploadApi } from "../../../api"
import { useForm } from "antd/es/form/Form"
import { compareFileChanges, locationToAncestors } from "../../../utils/Utils"
import { useDispatch } from "react-redux"
import { setLoaderState } from "../../../redux/Loader"
import { Map, Marker, MarkerDragEvent, NavigationControl } from "react-map-gl"
import { MAPBOX_API_KEY } from "../../../configs"
import GeocoderControl from "../../../components/GeocoderControl"
import Pin from "../../../utils/Map"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface OverviewItem {
  id: string
  name: string
  ancestors: any[]
  coordinates: number[]
  address: string[]
  description: string
  images: any[]
  type: string
}

export default function Overview() {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [item, setItem] = useState<OverviewItem>()
  const [removedFiles, setRemovedFiles] = useState<any[]>([])
  const [coors, setCoors] = useState<{longitude: number, latitude: number}>()
  const [viewState, setViewState] = useState<any>()
  const dispatch = useDispatch()
  const params = useParams()
  const [form] = useForm()
  useEffect(() => {
    const getList = async () => {
      const res = await apiCaller(itemApi.getOverviewItem(params.id ?? ""))

      if (res !== undefined) {
        setItem(res.data)
      }
    }

    getList()
  }, [params])

  useEffect(() => {
    setInitialValues()
  }, [item])

  const setInitialValues = () => {
    if (item) {
      const { address, ancestors, images, coordinates, ...rest } = item
      const location = JSON.stringify({ 
        ...ancestors[0], ancestors: ancestors.slice(1) 
      })
      setFileList(images)
      const newCoors = {
        longitude: coordinates[1],
        latitude: coordinates[0]
      }
      setCoors(newCoors)
      form.setFieldsValue({
        location,
        address: address[0], 
        extraAddress: address[1], 
        images, coordinates,       
        ...rest
      })
      setRemovedFiles([])
      setViewState({
        longitude: coordinates[1],
        latitude: coordinates[0],
        zoom: 12
      })
    }
  }

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

  const handleOnRemove = (file: any) => {
    if (!file.uid.includes("rc-upload"))
      setRemovedFiles([...removedFiles, file])
  }

  const handleOnDragEnd = (evt: MarkerDragEvent) => {
    const newCoors = {
      longitude: evt.lngLat.lng,
      latitude: evt.lngLat.lat
    }
    setCoors(newCoors)
  }

  useEffect(() => {
    coors && form.setFieldValue('coordinates', [coors.latitude, coors.longitude])
  }, [coors])

  const getCoordinates = () => {
    return (
      <>
        <div className="mt-2 mb-1 text-sm font-medium text-red-500">
          Drag the pin to set your location!
        </div>
        {coors && <div className="my-1 text-sm font-medium">
          <div>
            <span className="font-semibold mr-2">Longitude:</span>
            <span>{coors.longitude}</span>
          </div>
          <div>
            <span className="font-semibold mr-2">Latitude:</span>
            <span>{coors.latitude}</span>
          </div>
        </div>}
      </>
    )
  }

  const onFinish = (value: any) => {
    console.log(value.coordinates)
    const { images, location, address, extraAddress, ...rest } = value
    rest.ancestors = locationToAncestors(location)
    rest.address = extraAddress ? [address, extraAddress ] : [address]
    const files = compareFileChanges(images)
    console.log(rest)
    Modal.confirm({
      title: 'Are you sure update this item?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        const handleUpdate = async () => {
          dispatch(setLoaderState(true))
          if (removedFiles.length !== 0) 
            apiCaller(uploadApi.removeData(removedFiles))
          let res
          if (files.uploads.length !== 0)
            res = await apiCaller(uploadApi.upLoadData(files.uploads))
          else res = { data: [] }
          if (res !== undefined) {
            const newData = { 
              ...rest, 
              images: [...files.remains, ...res.data] 
            }
            res = await apiCaller(
              itemApi.updateItem(item?.id ?? "", newData)
            )          
            dispatch(setLoaderState(false))

            if (res !== undefined) {
              alert("Update successfully")
            }
          }

        }
        
        handleUpdate()
      }
    })
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 30 }
  }
  const uploadButton = (
    <div className="bg-transparent border-0 cursor-pointer">
      <PlusOutlined />
      <div className="mt-1 poppins-font text-sm">Upload</div>
    </div>
  )
  return (
    <div className="business-overview">
      <h2 className="mt-0">Overview</h2>
      {item && <div className="flex justify-between">
        <Form {...formItemLayout} form={form} 
          variant="filled" className="min-w-[36rem] mr-14"
          onFinish={onFinish}
        >
          <Form.Item 
            label="Name" name="name"
            rules={[{ required: true, message: 'This field cannot be empty' }]}
          >
            <Input placeholder="Enter a name"/>
          </Form.Item>
          <Form.Item
            name="location" label="Location" 
            rules={[{ required: true, message: 'Enter a location' }]}
          >
            <LocationSearch/>
          </Form.Item>
          <Form.Item 
            label="Address" name="address"
            rules={[{ required: true, message: 'This field cannot be empty' }]}>
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
              onRemove={handleOnRemove}
              onPreview={handleFilePreview}
              onChange={handleFilesChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label=" " name="coordinates"
          >
            <div className="flex">
              <div className="primary-button mr-5" 
                onClick={() => form.submit()}
              >
                Update
              </div>
              <div 
                className="secondary-button"
                onClick={setInitialValues}
              >
                Cancel
              </div>  
            </div>
          </Form.Item>
        </Form>
        <div className="h-96 w-full">
          <div className="h-[70vh] w-full bg-color-background-primary rounded-lg">
            <Map
              mapboxAccessToken={MAPBOX_API_KEY}
              {...viewState}
              onMove={e => setViewState(e.viewState)}
              style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              attributionControl={false} 
            > 
              <GeocoderControl mapboxAccessToken={MAPBOX_API_KEY} position="top-left" />
              <NavigationControl position="bottom-right"/>
              {coors && <Marker {...coors} draggable offset={[0, -15]}
                onDragEnd={handleOnDragEnd}
              >
                <Pin type={item.type}/>
              </Marker>}
            </Map>
          </div>
          <div>
            {getCoordinates()}
          </div>
        </div>
      </div>}
      
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