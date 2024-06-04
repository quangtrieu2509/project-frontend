import { IMAGE_PATH, ROUTES, iconTypes, itemTypes } from "../../../constants"
import Auth from "../Auth"
import "../index.style.scss"
import { useNavigate, useParams } from "react-router-dom"
import { businessUserItems } from "../itemLists"
import { Select } from "antd"
import { generateAddress } from "../../../utils/Utils"
import { useEffect, useState } from "react"
import { apiCaller, itemApi } from "../../../api"

interface Item {
  id: string
  name: string
  ancestors: any[]
  address: string[]
  type: string
}

interface SearchData {
  value: string
  label: string
  addressStr: string
  iconType: string
}

const convert = (data: Item[]): SearchData[] => {
  return data.map((e) => {
    const getIconType = (type: string) => {
      switch (type) {
        case itemTypes.ACCOMM: {
          return iconTypes.ACCOMM
        }
        case itemTypes.DINING: {
          return iconTypes.DINING
        }
        case itemTypes.ACTIVITY: {
          return iconTypes.ACTIVITY
        }
        default: {
          return iconTypes.LOCATION
        }
      }
    }

    return {
      value: e.id,
      label: e.name,
      addressStr: generateAddress(e.ancestors, e.address),
      iconType: getIconType(e.type)
    }
  }) as SearchData[]
} 

export default function Header() {
  const navigate = useNavigate()
  const [list, setList] = useState<Item[]>([])
  const params = useParams()

  useEffect(() => {
    const getList = async () => {
      const res = await apiCaller(itemApi.getItemForBusinessSearch())

      if (res !== undefined) {
        setList(res.data)
      }
    }

    getList()
  }, [])

  const handleChange = (newValue: string) => {
    navigate(ROUTES.BUSINESS_BASE + newValue)
  }

  return (
    <header className="header-normal h-16 flex justify-center bg-transparent">
      <div className="header-box max-w-6xl w-[72rem]">
        <nav className="header-nav">
          <div className="header-item flex w-56">
            <img
              alt="#"
              src={IMAGE_PATH.FULL_LOGO}
              className="image w-full cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="header-item flex">
            <Select
              value={params.id}
              className=" w-96"
              placeholder={"Select a business item"}
              defaultActiveFirstOption={false}
              filterOption={false}
              onChange={handleChange}
              options={convert(list)}
              optionRender={(option) => {
                const { label, addressStr, iconType } = option.data
                return (
                  <div className="flex items-center">
                    <div>
                      <i className={`bi bi-${iconType} mr-3 text-lg`}/>
                    </div>
                    <div>
                      <div className="font-semibold text-color-text-primary">{label}</div>
                      <div className="text-sm text-color-text-secondary">{addressStr}</div>
                    </div>
                  </div>
                )
              }}
            />
          </div>
          <div className="header-item flex justify-end w-52">
            <span className="text-base font-medium text-color-text-primary px-5 py-2 mx-px rounded-full bg-transparent hover:bg-color-hover-primary cursor-pointer">
              <i className="bi bi-bell text-xl"/>
            </span>
            <Auth itemsList={businessUserItems.items}/>
          </div>
        </nav>
      </div>
    </header>
  )
}
