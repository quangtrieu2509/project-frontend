import { Flex, Rate } from "antd"
import { useState } from "react"
import ReviewItem from "../ReviewItem"

export default function ReviewList() {
  const [rateSelection, setRateSelection] = useState<string>("")

  const generateReviewDetail = (key: string, name: string, quant: number) => {
    return (
      <div 
        className={`h-fit py-1.5 px-3 rounded-md border border-solid bg-white hover:bg-color-hover-primary cursor-pointer 
          ${key === rateSelection ? "border-color-secondary font-medium" : "border-color-border-primary"}`}
        onClick={() => setRateSelection(key)}  
      >
        {name} ({quant})
      </div>
    )
  }

  return (
    <div className="text-sm">
      <div className="text-lg font-semibold mb-3">
        Reviews
      </div>
      <div className="p-6 flex items-center text-sm bg-color-background-secondary rounded-md mb-4">
        <div className="flex flex-col w-fit min-w-fit items-center px-4 mr-6">
          <div>
            <span className="text-2xl font-semibold mr-1">
              {4.5}
            </span>
            <span className="text-lg font-normal">/ 5</span>
          </div>
          <Rate 
            allowHalf 
            disabled 
            value={5} 
            className="text-color-primary text-lg"
          />
        </div>
        <Flex wrap="wrap" gap={12}>
          {generateReviewDetail("", "All", 12)}
          {generateReviewDetail("excellent", "Excellent", 3)}
          {generateReviewDetail("good", "Good", 3)}
          {generateReviewDetail("average", "Average", 0)}
          {generateReviewDetail("poor", "Poor", 1)}
          {generateReviewDetail("terrible", "Terrible", 2)}
          {generateReviewDetail("image-included", "Image Included", 2)}
        </Flex>
      </div>

      <div className="h-full ml-[12.625rem]">
        {
          Array.from({ length: 5 }, (_, i) => (
            <ReviewItem key={i}/>
          ))
        }
      </div>
    </div>
  )
}