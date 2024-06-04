import { Form, Input, Modal } from "antd"
import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"

import "../index.style.scss"
import { setView } from "../../../redux/Auth"
import { AuthView } from "../../../redux/Auth/types"
import { apiCaller, authApi } from "../../../api"
import { setAuthStorage } from "../../../utils/Auth"
import Header from "../../../components/Auth/Header"
import { messages } from "../../../constants/message"
import { setLoaderState } from "../../../redux/Loader"

export default function EmailSignIn() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const handleGoBack = () => {
    dispatch(setView(AuthView.SIGNIN))
  }

  const handleGoToSignUpView = () => {
    dispatch(setView(AuthView.SIGNUP))
  }

  const handleForgotPassword = () => {
    alert('handleForgotPassword')
  }

  const handleSignInByEmail = async (values: any) => {
    dispatch(setLoaderState(true))
    const res: any = await apiCaller(authApi.signInByEmail(values))
    dispatch(setLoaderState(false))
    // console.log(res)

    if (res !== undefined) {
      if (res.ec === messages.ACTIVATE_EMAIL.ec) {
        Modal.info({
          title: "Info",
          content: "Please activate your email to continue.",
          className: "info-modal",
          okType: "text",
          centered: true,
        })
      } else {
        setAuthStorage(res.data)
        window.location.reload() // fix here
        // dispatch(setState(false))
      }
    }
  }

  return (
    <div className="auth-page">
      <Header text="Welcome back."/>
      <div className="signin-body flex-col">
        <div>
          <Form
            name="normal_signin"
            className="auth-form"
            initialValues={{ remember: true }}
            style={{ fontFamily: "Poppins" }}
            onFinish={handleSignInByEmail}
            form={form}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: "email",
                  message: "Email is not valid",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div className="w-full">
              <span 
                className="float-right cursor-pointer hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </span>
            </div>

            <Form.Item className="w-full flex justify-center">
              <div className="primary-button" onClick={() => form.submit()}>
                Sign in
              </div>
            </Form.Item>
            <div className="w-full">
              <span className="cursor-pointer" onClick={handleGoBack}>
                <i className="bi bi-arrow-return-left mr-1.5"/>Back
              </span>
            </div>
          </Form>
        </div>
        <div className="bg-color-border-primary h-px w-full my-6"></div>
        <div
          className="w-full flex justify-center"
          style={{ fontFamily: "Poppins" }}
        >
          <div>
            <span
              className="font-semibold underline cursor-pointer"
              onClick={handleGoToSignUpView}
            >
              Join
            </span>{" "}
            us if you are not a member.
          </div>
        </div>
      </div>
    </div>
  )
}
