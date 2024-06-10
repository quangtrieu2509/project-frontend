import { Form, Input, InputNumber, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { apiCaller, itemApi } from "../../../../api"
import { useForm } from "antd/es/form/Form"
import { filterFields } from "../../../../utils/Utils"
import { useDispatch } from "react-redux"
import { setLoaderState } from "../../../../redux/Loader"
import { diningFeatures, diningMeals, diningPrices, diningTypes } from "../../../../constants"
import HoursConfig, { Hour } from "../../../../components/Item/HoursConfig"

interface DiningProps {
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
  price: {
    level: string
    range?: number[]
  }
  hours: Array<{
    open: string
    close: string
  } | null>
  features: string[]
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 30 }
}

export default function Dining(props: DiningProps) {
  const [hours, setHours] = useState<Hour[]>(Array(7).fill(null))
  const [priceRange, setPriceRange] = useState<number[]>([0, 0])
  const dispatch = useDispatch()
  const [form] = useForm()

  useEffect(() => {
    setInitialValues()
  }, [props])

  const setInitialValues = () => {
    setHours(props.hours ?? Array(7).fill(null))
    setPriceRange(props.price?.range ?? [0, 0])

    form.setFieldsValue({
      categories: props.categories,
      meals: filterFields(props.features, diningMeals), 
      features: filterFields(props.features, diningFeatures), 
      priceLevel: props.price.level,
      isReservable: props.isReservable,
      phoneNumber: props.contacts.phoneNumber,
      email: props.contacts.email,
      website: props.contacts.website
    })
  }

  const onFinish = (value: any) => {
    const { 
      features, meals, priceLevel, 
      phoneNumber, email, website, ...rest
    } = value
    rest.features = [...features, ...meals]
    rest.price = {
      level: priceLevel,
      range: priceRange
    }
    rest.contacts = {
      phoneNumber, email, website
    }
    rest.hours = hours
    Modal.confirm({
      title: 'Are you sure update this item?',
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
    <div className="flex justify-between">
      <Form {...formItemLayout} form={form} 
        variant="filled" className="min-w-[36rem] mr-14 poppins-font"
        onFinish={onFinish}
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
            placeholder="Select"
            options={Object.entries(diningTypes).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="meals"
          label="Meals"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select"
            options={Object.entries(diningMeals).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="features"
          label="Features"
          rules={[{ required: true, message: 'Select at least one' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select"
            options={Object.entries(diningFeatures).map(([key, value]) => {
              return {
                value: key, label: value
              }
            })}
          />
        </Form.Item>
        <Form.Item
          name="priceLevel"
          label="Price Level"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
        >
          <Select
            placeholder="Select"
            style={{ width: "10rem" }}
            options={Object.entries(diningPrices).map(([key, value]) => {
              return {
                value: key, label: `${key} ${value}`
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
          name="isReservable"
          label="Is Reservable?"
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
          label="Phone Number" name="phoneNumber"
          rules={[{ required: true, message: 'This field cannot be empty' }]}
        >
          <Input type="tel" placeholder="Enter a phone number"/>
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
      <div className="w-full">
        <HoursConfig hours={hours} onChange={(e) => setHours(e)}/>
      </div>
    </div>
  )
}