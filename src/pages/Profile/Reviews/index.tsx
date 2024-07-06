import { useEffect, useState } from "react";
import Intro from "../../../components/Profile/Intro";
import NoResult from "../../../components/Profile/NoResult";
import TitleBar from "../../../components/Profile/TitleBar";
import { useParams } from "react-router-dom";
import { apiCaller, reviewApi } from "../../../api";
import ReviewOverview from "../../../components/Review/ReviewOverview";
import { Spin } from "antd";

export default function Reviews() {
  const [results, setResults] = useState<any[]>()
  const params = useParams()

  useEffect(() => {
    const getReviews = async () => {
      const res = await apiCaller(reviewApi.getProfileReviews(params.id ?? ""))
      
      if (res !== undefined) {
        setResults(res.data)
      }
    }

    getReviews()
  }, [params])
  return (
    <div className="profile-subpage flex mb-4">
      <div className="w-fit"><Intro/></div>
      <div className="profile-content flex-grow min-w-[50rem] ">
        <TitleBar title="Reviews"/>
        {
          results === undefined ? <Spin className="flex justify-center py-1"/> :
          results.length === 0 ? <NoResult/> :
          results.map(value => {
            return (
              <ReviewOverview key={value.id} {...value}/>
            )
          })
        }
      </div>
    </div>
  )
}