import { useEffect, useState } from 'react'
import { Select } from 'antd'
import { apiCaller, locationApi } from '../../../api'

interface ILocationOverview {
  id: string
  name: string
  ancestors: any[]
  image: any
}

interface ISearchData {
  value: string
  label: string
  detail: string
}

interface LocationSearchProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?:string
}

const convert = (data: ILocationOverview[]): ISearchData[] => {
  return data.map((e) => ({
    value: JSON.stringify(e),
    label: e.name,
    detail: e.ancestors.map(anc => anc.name).slice(0, 1).join(", ")
  })) as ISearchData[]
} 

export default function LocationSearch(props: LocationSearchProps) {
  const [data, setData] = useState<ISearchData[]>([])
  const [currentValue, setCurrentValue] = useState<string>()

  useEffect(() => {
    if (props.value) {
      setData(convert([JSON.parse(props.value)]))
      setCurrentValue(props.value)
    } else {
      setData([])
      setCurrentValue(undefined)
    }
  }, [props.value])

  const handleSearch = async(newSearch: string) => {
    const res = await apiCaller(locationApi.searchLocations(newSearch))
  
    if (res !== undefined) {
      setData(convert(res.data))
    }
  }

  const handleChange = (newValue: string) => {
    setCurrentValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <Select
      showSearch
      value={currentValue}
      placeholder={props.placeholder ?? "Where to?"}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      allowClear
      options={data}
      optionRender={(option) => (
        <div className="flex items-center">
          <div>
            <i className="bi bi-geo-alt mr-3 text-lg"/>
          </div>
          <div>
            <div className="font-semibold text-color-text-primary">{option.data.label}</div>
            <div className="text-sm text-color-text-secondary">{option.data.detail}</div>
          </div>
        </div>
      )}
    />
  )
}