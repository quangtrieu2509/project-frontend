import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setIsAtSearch } from "../../redux/Header"
import "./index.style.scss"
import { useNavigate, useSearchParams } from "react-router-dom";
import ItemInSearch from "../../components/Item/ItemInSearch";
import { apiCaller, itemApi } from "../../api";
import { itemTypes, pluralItemLabels } from "../../constants";
import NoResult from "../../components/Profile/NoResult";

const items = [
  {
    key: 'all',
    label: 'All'
  },
  {
    key: itemTypes.ATTRACTION,
    label: pluralItemLabels.ATTRACTION
  },
  {
    key: itemTypes.LODGING,
    label: pluralItemLabels.LODGING
  },
  {
    key: itemTypes.DINING,
    label: pluralItemLabels.DINING
  },
  {
    key: itemTypes.ACTIVITY,
    label: pluralItemLabels.ACTIVITY
  },
  {
    key: itemTypes.LOCATION,
    label: pluralItemLabels.LOCATION
  },
];

export default function Search() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filterSelected, setFilterSelected] = useState<string>('all')
  const [q, setQ] = useState<string>("")
  const [results, setResults] = useState<any[]>([])
  const [queries] = useSearchParams()

  useEffect(() => {
    dispatch(setIsAtSearch(true))

    return () => {
      dispatch(setIsAtSearch(false))
    }
  }, [dispatch])

  useEffect(() => {
    const query = queries.get("q") ?? ""
    const filter = queries.get("filter") ?? "all"
    setQ(query)
    setFilterSelected(filter)

    const getResults = async () => {
      const res = await apiCaller(itemApi.searchItems(query, filter))

      if(res !== undefined) {
        setResults(res.data)
      }
    }

    getResults()
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
            {
              !results.length
              ? <NoResult/>
              : results.map(e => {
                return (
                  <ItemInSearch key={e.id} {...e}/>
                )
              })
            }
          </div>

        </div>
      </div>
    </div>
  )
}