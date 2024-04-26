import { MenuProps } from "antd"
import { Dropdown as AntdDropdown } from "antd"
import { ReactNode } from "react"

interface DropdownProps {
  menuItems: MenuProps["items"]
  name: string
  customChild?: ReactNode
}

function Dropdown({ menuItems, name, customChild }: DropdownProps) {
  return (
    <div>
      <AntdDropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        className="header-dropdown"
      >
        {
          !customChild 
          ? <span
            className="text-base text-color-text-primary font-semibold px-4 py-2.5 rounded-full mx-px bg-transparent hover:bg-color-hover-primary cursor-pointer smooth-trans"
            onClick={(e) => e.preventDefault()}
          >
            {name}
          </span>
          : customChild
        }
      </AntdDropdown>
    </div>
  )
}

export default Dropdown
