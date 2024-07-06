import { useParams } from "react-router-dom";
import Intro from "../../../components/Profile/Intro";
import NoResult from "../../../components/Profile/NoResult";
import TitleBar from "../../../components/Profile/TitleBar";
import TripOverview from "../../../components/Trip/TripOverview";
import { apiCaller, userApi } from "../../../api";
import { useEffect, useState } from "react";
import ReviewOverview from "../../../components/Review/ReviewOverview";

export default function Activities() {
  const [results, setResults] = useState<any[] | null[]>([undefined])
  const params = useParams()

  useEffect(() => {
    const getTrips = async () => {
      const res = await apiCaller(userApi.getActivities(params.id ?? ""))
      
      if (res !== undefined) {
        // console.log("Activitis data: ", res.data)
        setResults(res.data)
      }
    }
    
    getTrips()
  }, [params])

  return (
    <div className="profile-subpage flex mb-4">
      <div className="w-fit"><Intro/></div>
      <div className="profile-content flex-grow min-w-[50rem]">
        <TitleBar title="Activities"/>
        <div>
          {
            results.length === 0
            ? <NoResult/>
            : results.map((value, index) => {
              if (value?.type === "review")
                return <ReviewOverview key={index} {...value}/>
              else return <TripOverview key={index} trip={value}/>
            })
          }
        </div>
      </div>
    </div>
  )
}