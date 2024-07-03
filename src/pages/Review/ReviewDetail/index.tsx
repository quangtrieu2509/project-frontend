import { useEffect, useState } from "react";
import ReviewOverview, { ReviewOverviewProps as Review } from "../../../components/Review/ReviewOverview";
import { useParams } from "react-router-dom";
import { apiCaller, reviewApi } from "../../../api";
import { messages } from "../../../constants/message";
import NotFound from "../../../components/Static/NotFound";

export default function ReviewDetail() {
  const [review, setReview] = useState<Review>()
  const [has404Error, setHas404Error] = useState<boolean>(false)
  const { id } = useParams()
  
  useEffect(() => {
    if (id) {
      const getReview = async () => {
        const res = await apiCaller(reviewApi.getReview(id),
          (error) => {
            if (error.ec === messages.NOT_FOUND.ec) {
              setHas404Error(true)
            }
          }
        )

        if (res !== undefined) {
          setReview(res.data)
        }
      }

      getReview()
    }
  }, [id])

  return (
    <div className="tp-page bg-color-background-primary">
      <div className="tp-wrapper flex flex-col items-center text-sm">
        {
          has404Error ? <NotFound/> : review === undefined ? 
          <div className="text-center">Loading...</div> :
          <div className="max-w-3xl">
            <ReviewOverview {...review}/>
          </div>
        }
      </div>
    </div>
  )
}