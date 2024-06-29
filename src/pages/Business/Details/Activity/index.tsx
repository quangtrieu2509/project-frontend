import { Form, Input, InputNumber, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { apiCaller, itemApi } from "../../../../api"
import { useForm } from "antd/es/form/Form"
import { useDispatch } from "react-redux"
import { setLoaderState } from "../../../../redux/Loader"
import { Duration, activityTypes, defaultDuration, durationUnits } from "../../../../constants"
import TextArea from "antd/es/input/TextArea"

interface ActivityProps {
  id: string
  ownerId: string
  contacts: {
    phoneNumber: string
    website?: string
    email?: string
  }
  type: string
  isReservable: boolean
  categories: string[]
  ticketPrice?: number[]
  duration?: {
    value: number
    unit: string
  }
  ages?: number[]
  included?: string
  excluded?: string
  requirements?: string
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 30 }
}

const textAreaSz = { minRows: 2, maxRows: 6 }

export default function Activity(props: ActivityProps) {
  const [duration, setDuration] = useState<Duration>(defaultDuration)
  const [priceRange, setPriceRange] = useState<number[]>([0, 0])
  const [ages, setAges] = useState<number[]>([0, 0])
  const dispatch = useDispatch()
  const [form] = useForm()

  useEffect(() => {
    setInitialValues()
  }, [props])

  const setInitialValues = () => {
    props.ticketPrice && setPriceRange(props.ticketPrice)
    props.ages && setAges(props.ages)
    props.duration && setDuration(props.duration)

    form.setFieldsValue({
      categories: props.categories,
      isReservable: props.isReservable,
      phoneNumber: props.contacts.phoneNumber,
      email: props.contacts.email,
      website: props.contacts.website,
      included: props.included,
      excluded: props.excluded,
      requirements: props.requirements
    })
  }

  const onFinish = (value: any) => {
    const { phoneNumber, email, website, ...rest } = value
    rest.ticketPrice = priceRange
    rest.ages = ages
    duration.value && (rest.duration = duration)
    rest.contacts = {
      phoneNumber, email, website
    }
    console.log(rest)
    Modal.confirm({
      title: 'Are you sure to update this item?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        const handleUpdate = async () => {
          dispatch(setLoaderState(true))
          const res = await apiCaller(
            itemApi.updateItem(props.id, rest)
          )          
          dispatch(setLoaderState(false))

          if (res !== undefined) {
            alert("Update successfully")
          }
        }
        
        handleUpdate()
      }
    })
  }

  return (
    <div className="grid grid-cols-2 gap-x-8">
      <Form  className="w-full poppins-font" {...formItemLayout}
        variant="filled" form={form} onFinish={onFinish}
      >
        <div className=" text-color-text-primary font-semibold text-lg mb-2">
          Basic Info
        </div>
        <Form.Item
          name="categories"
          label="Type"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select no more than 5"
            maxCount={5}
            options={Object.entries(activityTypes).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          label="Price Range"
        >
          <InputNumber
            min={0} max={priceRange[1]} placeholder="Min" addonBefore="$" className="w-28"
            onChange={
              (e) => setPriceRange([e ?? 0, priceRange[1]])
            } value={priceRange[0]} 
          />
          <span className="mx-1.5 text-lg">-</span>
          <InputNumber 
            min={priceRange[0]} placeholder="Max" addonBefore="$" className="w-28"
            onChange={
              (e) => setPriceRange([priceRange[0], e ?? priceRange[0]])
            } value={priceRange[1]}
          />
          <span className=" text-color-text-tertiary ml-3">(optional)</span>
        </Form.Item>
        <Form.Item
          label="Duration"
        >
          <InputNumber
            min={1} max={100} placeholder="0" className="w-20"
            onChange={
              (e) => setDuration({ ...duration, value: e ?? undefined })
            } value={duration.value} 
          />
          <span className="mx-1"/>
          <Select
            placeholder="Select"
            style={{ width: "7rem" }}
            value={duration.unit}
            onChange={e => setDuration({ ...duration, unit: e })}
            options={Object.entries(durationUnits).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
          <span className=" text-color-text-tertiary ml-3">(optional)</span>
        </Form.Item>
        <Form.Item
          label="Ages"
        >
          <InputNumber
            min={0} max={100} placeholder="Min" addonAfter="y/o" className="w-[6.5rem]"
            onChange={
              (e) => setAges([e ?? 0, ages[1]])
            } value={ages[0]} 
          />
          <span className="mx-1.5 text-lg">-</span>
          <InputNumber 
            min={0} max={100} placeholder="Max" addonAfter="y/o" className="w-[6.5rem]"
            onChange={
              (e) => setAges([ages[0], e ?? ages[0]])
            } value={ages[1]}
          />
          <span className=" text-color-text-tertiary ml-3">(optional)</span>
        </Form.Item>
        <Form.Item
          name="isReservable"
          label="Reservable?"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
        >
          <Select
            style={{ width: "6rem" }}
            placeholder="Select"
            options={[
              { value: false, label: 
                <span className="text-color-text-primary">
                  <i className="bi bi-x-lg mr-1"/> No
                </span> 
              },
              { value: true, label: 
                <span className="text-color-text-primary">
                  <i className="bi bi-check-lg mr-1"/> Yes
                </span> 
              }
            ]}
          />
        </Form.Item>
        <div className=" text-color-text-primary font-semibold text-lg mb-2">
          Contacts
        </div>
        <Form.Item 
          label="Phone No." name="phoneNumber"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
        >
          <Input placeholder="Enter a phone number"/>
        </Form.Item>
        <Form.Item 
          label="Email" name="email"
          rules={[
            {
              type: "email",
              message: "Email is not valid",
            }
          ]}
        >
          <Input placeholder="Enter a email (optional)"/>
        </Form.Item>
        <Form.Item 
          label="Website" name="website"
          rules={[
            {
              type: "url",
              message: "Website is not valid",
            }
          ]}
        >
          <Input placeholder="Enter a website (optional) https://example.com"/>
        </Form.Item>
        <Form.Item
          label=" "
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
      <Form className="w-full poppins-font" {...formItemLayout}
        variant="filled" form={form} onFinish={onFinish}
      >
        <div className=" text-color-text-primary font-semibold text-lg mb-2">
          More Info
        </div>
        <Form.Item 
          label="Included" name="included"
        >
          <TextArea placeholder="Enter things included (optional)"
            autoSize={textAreaSz}
          />
        </Form.Item>
        <Form.Item 
          label="Excluded" name="excluded"
        >
          <TextArea placeholder="Enter things excluded (optional)"
            autoSize={textAreaSz}
          />
        </Form.Item>
        <Form.Item 
          label="REQs" name="requirements"
        >
          <TextArea placeholder="Enter requirements (optional)"
            autoSize={textAreaSz}
          />
        </Form.Item>
      </Form>
    </div>
  )
}