import { Input } from "antd";
import { IMAGE_PATH } from "../../constants";
import { MailOutlined } from "@ant-design/icons";

const description = "Trippie is a website that helps you make itineraries for your own trips and also provides many services for your own businesses."

export default function Footer() {
  return (
    <footer className="h-fit py-7 flex justify-center bg-rose-100 text-sm text-color-extra-text-primary">
      <div className="footer-box max-w-6xl w-[72rem] grid grid-cols-4 gap-x-6">
        <div>
          <div className="header-item flex w-40 mb-3">
            <img
              alt="#"
              src={IMAGE_PATH.FULL_LOGO}
              className="image w-full cursor-pointer"
            />
          </div>
          <div className="mb-2">{description}</div>
          <div className=" text-xs">
            © 2024 Trippie All rights reserved.
          </div>
        </div>
        <div className="pl-20">
          <div className="font-semibold mb-2">MENU</div>
          <div className="hover:underline cursor-pointer mb-1">Contacts</div>
          <div className="hover:underline cursor-pointer mb-1">Term & Condition</div>
          <div className="hover:underline cursor-pointer mb-1">Privacy Policy</div>
        </div>
        <div className="pl-14">
          <div className="font-semibold mb-2">FOLLOW US</div>
          <div className="hover:underline cursor-pointer mb-1"><i className="bi bi-facebook mr-2"/>Facebook</div>
          <div className="hover:underline cursor-pointer mb-1"><i className="bi bi-instagram mr-2"/>Instagram</div>
          <div className="hover:underline cursor-pointer mb-1"><i className="bi bi-twitter mr-2"/>Twitter</div>
          <div className="hover:underline cursor-pointer mb-1"><i className="bi bi-pinterest mr-2"/>Pinterest</div>
        </div>
        <div>
          <div className="font-semibold mb-2">NEWSLETTER</div>
          <div className="mb-2 text-xs">Leave your email to receive our newest informations.</div>
          <Input addonAfter={<MailOutlined/>} className="bg-white rounded-lg"/>
        </div>
      </div>
    </footer>
  )
}
