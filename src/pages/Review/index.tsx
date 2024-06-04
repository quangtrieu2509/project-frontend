import { Checkbox, Form, GetProp, Image, Input, Rate, Select, Upload, UploadFile, UploadProps } from "antd"
import { useEffect, useState } from "react"
import "./index.style.scss"
import { PlusOutlined } from "@ant-design/icons"
import { generateLast12Months } from "../../utils/Utils"
import NotFound from "../Static/NotFound"
import { useNavigate, useParams } from "react-router-dom"
import { apiCaller, itemApi, uploadApi } from "../../api"
import { messages } from "../../constants/message"
import { reviewApi } from "../../api/review"
import { useDispatch } from "react-redux"
import { setLoaderState } from "../../redux/Loader"
import { ROUTES, rateLevelArr, rateLevelObj } from "../../constants"
import CardItem, { CardItemProps } from "../../components/Item/CardItem"

const agreement = "I certify that this review is based on my own experience" + 
  " and is my genuine opinion of this place, and that I have no personal or" + 
  " business relationship with this establishment, and have not been offered" + 
  " any incentive or payment originating from the establishment to write this review."

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const monthsList = generateLast12Months()

const tripTypeOpts = [
  { value: 'solo', label: "Solo" },
  { value: 'couple', label: "Couple" },
  { value: 'family', label: "Family" },
  { value: 'friends', label: "Friends" },
  { value: 'business', label: "Business" }
]

export default function Review() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const [rateValue, setRateValue] = useState<number>(5)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [item, setItem] = useState<CardItemProps>()
  const [form] = Form.useForm()
  const { id } = useParams()

  useEffect(() => {
    const getLocation = async () => {
      const res = await apiCaller(
        itemApi.getItemForReview(id ?? ""),
        (error) => {
          if (error.ec === messages.NOT_FOUND.ec) {
            setHas404Error(true)
          }
        }
      )
      
      if (res !== undefined) {
        console.log(res.data)
        setItem(res.data)
      }
    }

    getLocation()

  }, [id])


  const handleFilePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleFilesChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    form.setFieldValue('images', newFileList.map(e => e.originFileObj))
    setFileList(newFileList)
  }

  const onRateChange = (value: number) => {
      form.setFieldValue('rate', value)
      setRateValue(value)
  }

  const onSubmitReview = async (value: any) => {
    if (id !== undefined) {
      dispatch(setLoaderState(true))
      const { images, ...rest } = value
      let res
      if (images.length !== 0)
        res = await apiCaller(uploadApi.upLoadData(images))
      else res = { data: [] }
      if (res !== undefined) {
        res = await apiCaller(
          reviewApi.createReview(id, { images: res.data, ...rest })
        )
        dispatch(setLoaderState(false))
        if (res !== undefined) {
          navigate(ROUTES.SUCCESS, { 
            state: { 
              action: "sharing", 
              statement: "Your review helps other travelers and that's pretty awesome" } 
          })
        }
      }
    }
  } 

  const uploadButton = (
    <div className="bg-transparent border-0 cursor-pointer">
      <PlusOutlined />
      <div className="mt-1 poppins-font text-sm">Upload</div>
    </div>
  )

  return (
    has404Error 
    ? <NotFound/> 
    : <div className="tp-page review-page bg-white">
      <div className="tp-wrapper flex mt-10 mb-5">
        <div className="w-1/3 min-w-[22rem] border-0 border-r border-solid border-color-border-secondary h-fit sticky top-24">
          <h1 className="mt-0 text-4xl">Tell us, how was your visit?</h1>
          {item && <CardItem {...item}/>}
        </div>
        <div className="w-2/3 pl-10">
          <Form 
            layout="vertical"
            form={form}  
            onFinish={onSubmitReview}
          >
            <Form.Item
              name="rate"
              label="How would you rate your experience?"
              initialValue={5}
            >
              <div className="flex items-center">
                <Rate 
                  className="text-color-primary text-4xl" 
                  tooltips={rateLevelArr} value={rateValue} 
                  onChange={onRateChange} allowClear={false}
                /> 
                <span className="ml-4 text-base">{rateLevelObj[rateValue]}</span>
              </div>
            </Form.Item>
            <Form.Item
              name="travelDate"
              label="When did you go?"
              initialValue={monthsList[0].value}
            >
              <Select
                style={{ width: "10rem" }}
                placeholder="Select"
                options={monthsList}
              />
            </Form.Item>
            <Form.Item
              name="tripType"
              label="Who did you with?"
              initialValue={tripTypeOpts[0].value}
            >
              <Select
                style={{ width: "7rem" }}
                placeholder="Select"
                options={tripTypeOpts}
              />
            </Form.Item>
            <Form.Item
              name="content"
              label="Write your review"
              rules={[
                { required: true, message: 'Please enter the content' },
                { min: 100, message: "Please enter minimum 100 characters" }
              
              ]}
            >
              <Input.TextArea rows={4} placeholder="How was your visit?" minLength={100}
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
              name="images"
              label="Add some photos"
              initialValue={[]}
            >
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                accept="image/png, image/jpeg"
                fileList={fileList}
                beforeUpload={(file) => {
                  return false
                }}
                onPreview={handleFilePreview}
                onChange={handleFilesChange}
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value 
                    ? Promise.resolve() 
                    : Promise.reject(new Error('Please agree to the terms above to continue.'))
                }
              ]}
            >
              <Checkbox className="poppins-font font-normal">
                <div className=" pl-1">
                  {agreement}
                </div>
              </Checkbox>
            </Form.Item>
            <Form.Item className="flex justify-center">
              <div className="primary-button w-fit"
                style={{ borderRadius: 9999, fontWeight: 500, padding: "0.75rem 1.25rem" }}
                onClick={() => form.submit()}
              >
                Submit review
              </div>
            </Form.Item>
          </Form>
        </div>
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