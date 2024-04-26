import { FilterOutlined } from "@ant-design/icons";

export default function TitleBar(props: {title: string}) {
  return (
    <div className="title-bar mb-4 text-color-text-primary">
      <div className="flex justify-between items-center bg-white rounded-lg px-6">
        <div className="font-semibold text-lg py-3.5">{props.title}</div>
        <div className="px-3 py-1.5 rounded-md cursor-pointer">
          <FilterOutlined/>
          <span className="ml-1.5">Filters</span>
        </div>
      </div>
    </div>
  )
}