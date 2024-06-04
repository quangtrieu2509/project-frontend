import { Flex, Rate } from "antd"
import { useEffect, useState } from "react"
import ReviewItem from "../ReviewItem"
import { rateDetail } from "../../../constants"
import { roundRate } from "../../../utils/Utils"
import { apiCaller } from "../../../api"
import { reviewApi } from "../../../api/review"

interface ReviewListProps {
  id: string
}

export default function ReviewList(props: ReviewListProps) {
  const [rateSelection, setRateSelection] = useState<string>(rateDetail[0].key)
  const [rate, setRate] = useState<number>(0)
  const [rateCounts, setRateCounts] = useState<number[]>(Array(7).fill(0))
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const getReviewsOfItem = async () => {
      const res = await apiCaller(reviewApi.getOverviewRates(props.id))

      if (res !== undefined) {
        // console.log(res.data)
        setRate(res.data.rate)
        setRateCounts(res.data.rateCounts)
      }
    }

    getReviewsOfItem()
  }, [props.id])

  useEffect(() => {
    const getReviews = async () => {
      const res = await apiCaller(reviewApi.getReviews(props.id, rateSelection))
      
      if (res !== undefined) {
        console.log(res.data)
        setReviews(res.data)
      }
    }

    getReviews()
  }, [props.id, rateSelection])


  const generateRateDetail = (key: string, name: string, quant: number = 0) => {
    return (
      <div 
        key={key}
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
              {roundRate(rate)}
            </span>
            <span className="text-lg font-normal">/ 5</span>
          </div>
          <Rate 
            allowHalf 
            disabled 
            value={roundRate(rate)} 
            className="text-color-primary text-lg"
          />
        </div>
        <Flex wrap="wrap" gap={12}>
          {
            rateDetail.map((e, i) =>
              generateRateDetail(e.key, e.name, rateCounts[i])
            )
          }
        </Flex>
      </div>

      <div className="h-full ml-[12.625rem]">
        {
          reviews.map((e, i) => (
            <ReviewItem {...e} key={i}/>
          ))
        }
      </div>
    </div>
  )
}