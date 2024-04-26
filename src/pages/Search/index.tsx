import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setIsAtSearch } from "../../redux/Header"
import "./index.style.scss"
import { useNavigate, useSearchParams } from "react-router-dom";
import ItemInSearch from "../../components/Item/ItemInSearch";

const items = [
  {
    key: 'all',
    label: 'All'
  },
  {
    key: 'attractions',
    label: 'Attractions'
  },
  {
    key: 'accommodations',
    label: 'Accommodations'
  },
  {
    key: 'dinings',
    label: 'Dinings'
  },
  {
    key: 'activities',
    label: 'Activities'
  },
  {
    key: 'locations',
    label: 'Locations'
  },
];

export default function Search() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filterSelected, setFilterSelected] = useState<string>('all')
  const [q, setQ] = useState<string>("")
  const [queries] = useSearchParams()

  useEffect(() => {
    dispatch(setIsAtSearch(true))

    return () => {
      dispatch(setIsAtSearch(false))
    }
  }, [dispatch])

  useEffect(() => {
    setQ(queries.get("q") ?? "")
    setFilterSelected(queries.get("filter") ?? "all")
  }, [queries])

  const handleChangeSearchParam = (key: string, value: any) => {
    queries.set(key, value)
    navigate(`?${queries.toString()}`)
  }

  const getFilterLabel = () => {
    for (const item of items) {
      if (item.key === filterSelected) 
        return item.label
    }
  }
  return (
    <div className="tp-page search-page bg-white flex flex-col items-center">
      <div className="sticky top-[4.5rem] h-fit w-full py-4 bg-white flex justify-center z-10">
        <div className="flex justify-between h-fit p-1 w-[42em] border-solid border-2 rounded-full border-color-border-primary bg-white">
          <input
            className="poppins-font h-8 w-full p-2 pl-6 text-base text-color-text-primary border-none rounded-full focus:outline-none"
            placeholder={"Search Trippie"}
            defaultValue={q}
            onChange={(value) => setQ(value.target.value)}
          ></input>
          <span 
            className="flex items-center font-semibold text-base text-color-primary px-5 py-2.5 border-solid border border-color-primary rounded-full bg-white hover:bg-color-hover-primary cursor-pointer"
            onClick={() => handleChangeSearchParam("q", q)}  
          >
            Search
          </span>
        </div>
      </div>
      <div className="tp-wrapper flex pt-10">
        <div className="bg-white w-52 min-w-[13rem] h-fit px-8 py-5 mr-8 rounded-lg border border-solid border-color-border-secondary">
          <div className="font-semibold text-lg">
            {"Filter Results"}
          </div>
          {
            items.map((value, index) => {
              return (
                <div 
                  key={index} 
                  className={`mt-4 cursor-pointer hover:underline smooth-trans
                    ${filterSelected === value.key ? "underline font-medium" : ""}`}
                  onClick={() => handleChangeSearchParam("filter", value.key)}
                >
                  {value.label}
                </div>
              )
            })
          }  
        </div>
        
        <div className="w-full">
          <div className="text-2xl font-semibold mb-5">
            {`${getFilterLabel()} matching "${queries.get("q")}"`}
          </div>

          <div>
            <ItemInSearch/>
            <ItemInSearch/>
            <ItemInSearch/>
            <ItemInSearch/>
            <ItemInSearch/>
            <ItemInSearch/>
          </div>

        </div>
      </div>
    </div>
  )
}