import { Spin } from "antd"
import { useEffect, useState } from "react"
import NoResult from "../../components/Profile/NoResult"
import ReviewOverview from "../../components/Review/ReviewOverview"
import TripOverview from "../../components/Trip/TripOverview"
import { apiCaller, userApi } from "../../api"

export default function NewFeeds() {
  const [list, setList] = useState<any[]>()

  useEffect(() => {
    const getList = async () => {
      const res = await apiCaller(userApi.getNewFeeds())

      if (res !== undefined) {
        setList(res.data)
      }
    }

    getList()
  }, [])
  return (
    <div className="tp-page bg-color-background-primary">
      <div className="tp-wrapper flex flex-col items-center text-sm">
      {
        list === undefined ? <Spin className="py-4"/> :
        !list.length ? <NoResult/> :
        list.map((e: any) => {
          if (e?.type === "review")
            return <div className="max-w-3xl">
                <ReviewOverview {...e}/>
              </div>
          else return <div className="max-w-3xl">
              <TripOverview trip={e}/>
            </div>
        })
      }

      </div>

    </div>
  )
}