import { useEffect, useState } from "react"
import { apiCaller, locationApi } from "../../../api"
import NoResult from "../../../components/Profile/NoResult"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants"

interface SelectingProps {
  id: string
  keyType: string
}

interface OverviewLocation {
  id: string
  name: string
  slug: string
  image: {
    name: string
    url: string
  }
}

export default function Selecting(props: SelectingProps) {
  const navigate = useNavigate()
  const [list, setList] = useState<OverviewLocation[]>([])

  useEffect(() => {
    const getList = async (id: string) => {
      const res = await apiCaller(locationApi.getOverviewLocations(id))

      if (res !== undefined) {
        console.log(res.data)
        setList(res.data)
      }
    }

    getList(props.id)
  }, [props.id])

  const handleNavigate = (slug: string) => {
    navigate(ROUTES.TOURISM_BASE + `${slug}/${props.keyType}`)
  }
  return (
    <div className="flex justify-center mb-10">
    {
      !list.length
      ? <NoResult/>
      : <div className="w-full p-6 bg-white">
        <div className="grid grid-cols-4 gap-6">
          {
            list.map((e, i) => (
              <div key={e.id}>
                <div className="relative flex w-full h-52 cursor-pointer"
                  onClick={() => handleNavigate(e.slug)}
                >
                  <div 
                    className="absolute w-full bottom-0 left-0 flex gap-1 items-center p-1 box-border"
                  >
                    <div className="h-9 w-9 flex items-center justify-center bg-white rounded-full shadow-lg font-bold text-color-extra-text-primary">
                      {i + 1}
                    </div>
                    <div className="w-[13rem] px-3 box-border h-9 flex items-center justify-center bg-white rounded-full shadow-lg font-semibold hover:underline">
                      <span className="w-full text-center ellipsis">{e.name}</span>
                    </div>
                  </div>
                  <img alt={e.image.name} src={e.image.url} 
                    className="image w-full h-full rounded-[7px] object-cover object-center" 
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    }
    </div>
  )
}