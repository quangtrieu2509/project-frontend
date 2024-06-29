import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd"
import { useEffect, useState } from "react"
import "./index.style.scss"
import { generateTimeList } from "../../utils/Utils"
import NotFound from "../Static/NotFound"
import { useNavigate, useParams } from "react-router-dom"
import { apiCaller, bookingApi, itemApi } from "../../api"
import { messages } from "../../constants/message"
import { useDispatch } from "react-redux"
import { setLoaderState } from "../../redux/Loader"
import CardItem, { CardItemProps } from "../../components/Item/CardItem"
import dayjs from "dayjs"
import { ROUTES } from "../../constants"


const timeList = generateTimeList().map(e => ({ label: e, value: e }))

export default function Booking() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [has404Error, setHas404Error] = useState<boolean>(false)
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
        res.data.isReservable ? setItem(res.data) : setHas404Error(true)
      }
    }

    getLocation()

  }, [id])

  const onSubmitReview = async (value: any) => {
    console.log(value)
    if (id !== undefined) {
      dispatch(setLoaderState(true))
      const res = await apiCaller(
        bookingApi.createBooking(id, value)
      )
      dispatch(setLoaderState(false))
      if (res !== undefined) {
        navigate(ROUTES.BOOKINGS)
      }
    }
  } 

  return (
    has404Error 
    ? <NotFound/> 
    : <div className="tp-page booking-page bg-white">
      <div className="tp-wrapper flex mt-10 mb-5">
        <div className="w-1/3 min-w-[22rem] border-0 border-r border-solid border-color-border-secondary h-fit sticky top-24">
          <h1 className="mt-0 text-4xl">Let's bookkkk</h1>
          {item && <CardItem {...item}/>}
        </div>
        <div className="w-2/3 pl-10">
          <Form 
            layout="vertical"
            form={form}  
            onFinish={onSubmitReview}
          >
            <Form.Item
              name="date"
              label="When will you come?"
              rules={[
                { required: true, message: 'Please select the date' },
              ]}
            >
              <DatePicker disabledDate={(curr: any) => curr < dayjs().startOf("day")}/>
            </Form.Item>
            <Form.Item
              name="startTime"
              label="What time?"
              initialValue={timeList[0].value}
            >
              <Select
                style={{ width: "10rem" }}
                placeholder="Select"
                options={timeList}
              />
            </Form.Item>
            <Form.Item
              name="numOfGuests"
              label="Number of Guests"
              initialValue={1}
            >
              <InputNumber 
                min={1} max={200} 
                placeholder="0"
              />
            </Form.Item>
            <Form.Item
              name="note"
              label="Note:"
              rules={[
                { required: true, message: 'Please enter the note' },
                { min: 30, message: "Please enter minimum 30 characters" }
              
              ]}
            >
              <Input.TextArea rows={4} placeholder="What do you want to reserve?" minLength={100}
              showCount={
                { formatter: (info: { value: string, count: number}) => (
                  <div>
                    {info.count}/30 min characters
                  </div>
                ) }
              }
              />
            </Form.Item>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "This field cannot be empty",
                    }
                  ]}
                >
                  <Input placeholder="Enter your phone number"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "This field cannot be empty",
                    },
                    {
                      type: "email",
                      message: "Email is not valid",
                    }
                  ]}
                >
                  <Input placeholder="Enter your email"/>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item className="flex justify-center">
              <div className="primary-button w-fit"
                style={{ borderRadius: 9999, fontWeight: 500, padding: "0.75rem 1.25rem" }}
                onClick={() => form.submit()}
              >
                Submit
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}