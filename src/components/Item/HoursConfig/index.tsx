import { Checkbox, Select } from "antd";
import { generateHoursPreview, generateTimeList2 } from "../../../utils/Utils";
import { days } from "../../../constants/days";
import { useState } from "react";

export type Hour = {
  open: string, close: string
} | null

interface HoursConfigProps {
  hours: Hour[]
  onChange: (hours: Hour[]) => void
}

export default function HoursConfig(props: HoursConfigProps) {
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [close, setClose] = useState<boolean>(false)
  const [period, setPeriod] = useState<{ open: string, close: string }>(
    { open: "12:00 AM", close: "12:00 AM" }
  )

  const handleSaveHours = () => {
    const tmp = [...props.hours]
    if (close) tmp[selectedDay] = null
    else tmp[selectedDay] = period
    props.onChange(tmp)
  }

  const generateDays = () => {
    return days.map((e, i) => (
      <div key={i}>
        <div 
          className="primary-outlined-button text-sm"
          style={{ 
            borderRadius: "999px",
            fontWeight: 500, 
            padding: "0.25rem 0.75rem",
            borderColor: `var(--color-${selectedDay === i ? "secondary" : "border-primary"})` 
          }}
          onClick={() => setSelectedDay(i)}
        >
          {e.label}
        </div>
      </div>
    ))
  }

  return (
    <div>
     <div className=" text-color-text-primary font-semibold text-lg mb-2">
        Hours
      </div>
      <div className="flex justify-between mb-6">
        {generateDays()}
      </div>
      <Checkbox onChange={(e) => setClose(e.target.checked)}
        className="poppins-font font-normal mb-2"
      >
        Close all day
      </Checkbox>
      <div className="flex items-center mb-6">
        <div className={`mr-6 ${close ? "hidden" : ""}`}>
          <Select
            placeholder="Select"
            style={{ width: "6.5rem" }}
            options={
              generateTimeList2().map(e => ({ value: e, label: e }))
            }
            value={period.open}
            onChange={(e) => setPeriod({ ...period, open: e })}
          />
          <span className="mx-1 text-base">-</span>
          <Select
            placeholder="Select"
            style={{ width: "6.5rem" }}
            options={
              generateTimeList2().map(e => ({ value: e, label: e }))
            }
            value={period.close}
            onChange={(e) => setPeriod({ ...period, close: e })}
          />
        </div>
        <div 
          className="primary-button"
          style={{ fontSize: "14px", borderRadius: "999px", padding: "0.375rem 0.875rem" }}
          onClick={handleSaveHours}
        >
          Save
        </div>
      </div>
      <div className=" text-color-text-primary font-semibold text-base mb-2">
        Preview
      </div>
      <div className=" text-color-text-primary text-sm">
        {generateHoursPreview(props.hours)}
      </div>
    </div>
  )
}