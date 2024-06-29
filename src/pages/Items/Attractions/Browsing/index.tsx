import { Checkbox, Collapse, CollapseProps, Rate } from "antd";
import Slider from "react-slick";
import "./index.style.scss"
import { itemTypes, attractionTypes } from "../../../../constants";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AttractionOverviewProps as Item } from "../../../../components/Item/AttractionOverview";
import { apiCaller, itemApi } from "../../../../api";
import { generateSlickClass } from "../../../../utils/Utils";
import TripListDrawer from "../../../../components/Drawer/TripListDrawer";
import AttractionOverview from "../../../../components/Item/AttractionOverview";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

const slickLimit = 3

interface BrowsingProps {
  id: string
}

type BrowsingItem = Record<string, Item[]>

const browsingInit = {
  "nat-park": [],
  beach: [],
  island: [],
  "ancient-ruin": []
}

export default function Browsing(props: BrowsingProps) {
  const navigate = useNavigate()
  const [browsingList, setBrowsingList] = useState<BrowsingItem>(browsingInit)
  const [queriedList, setQueriedList] = useState<Item[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [rates, setRates] = useState<string[]>([])

  const [queries] = useSearchParams()

  const isEmptyFilter = () => {
    return (types.length === 0 && rates.length === 0)
    ? true
    : false
  }

  useEffect(() => {
    const getQueryParams = (key: string) => queries.get(key)?.split(",") ?? []
    setTypes(getQueryParams("types"))
    setRates(getQueryParams("rates"))
  }, [queries])

  useEffect(() => {
    const getQueriedList = async (id: string, data: any) => {
      const res = await apiCaller(
        itemApi.getQueriedItems(id, itemTypes.ATTRACTION, data)
      )

      if (res !== undefined) {
        console.log(res.data)
        setQueriedList(res.data)
      }
    }

    !isEmptyFilter() 
      && getQueriedList(props.id, { types, rates })
  }, [props.id, types, rates])

  useEffect(() => {
    const getBrowsingList = async (id: string) => {
      const res = await apiCaller(
        itemApi.getBrowsingItems(id, itemTypes.ATTRACTION)
      )

      if (res !== undefined) {
        console.log(res.data)
        setBrowsingList(res.data)
      }
    }

    getBrowsingList(props.id)
  }, [props.id])

  const setQueryParams = (key: string, value: string[]) => {
    value.length === 0
    ? queries.delete(key)
    : queries.set(key, value.toString())

    navigate(`?${queries.toString()}`)
  }

  const collapseItems: CollapseProps['items'] = [
    {
      key: 'types',
      label: 'Types',
      children: <Checkbox.Group
        options={Object.entries(attractionTypes).map(([key, value]) => {
          return {
            label: value, value: key
          }
        })}
        className="flex flex-col mb-2"
        onChange={(e) => setQueryParams("types", e)}
        value={types}
      />
    },
    {
      key: 'rates',
      label: 'Traveler Ratings',
      children: <Checkbox.Group
      options={[
        {
          label: <><Rate disabled defaultValue={3} className="text-color-primary text-base mr-4"/>& up</>,
          value: "3"
        },
        {
          label: <><Rate disabled defaultValue={4} className="text-color-primary text-base mr-4"/>& up</>,
          value: "4"
        },
        {
          label: <><Rate disabled defaultValue={5} className="text-color-primary text-base mr-4"/></>,
          value: "5"
        }
      ]}
      className="flex flex-col mb-2"
      onChange={(e) => setQueryParams("rates", e)}
      value={rates}
    />
    }
  ]

  const generatePopularList = () => {
    const [l1, l2, l3, l4] = [
      browsingList["nat-park"], 
      browsingList.beach, 
      browsingList.island, 
      browsingList["ancient-ruin"]
    ]
    return (
      <>
      {Boolean(l1.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">National Parks</h2>
        <Slider {...settings}
          className={generateSlickClass(l1.length, slickLimit)}
        >
          {l1.map((e: any) => (<AttractionOverview key={e.id} {...e}/>))}
        </Slider>
      </div>}
      {Boolean(l2.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">Beaches</h2>
        <Slider {...settings}
          className={generateSlickClass(l2.length, slickLimit)}
        >
          {l2.map((e: any) => (<AttractionOverview key={e.id} {...e}/>))}
        </Slider>
      </div>}
      {Boolean(l3.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">Islands</h2>
        <Slider {...settings}
          className={generateSlickClass(l3.length, slickLimit)}
        >
          {l3.map((e: any) => (<AttractionOverview key={e.id} {...e}/>))}
        </Slider>
      </div>}
      {Boolean(l4.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">Ancient Ruins</h2>
        <Slider {...settings}
          className={generateSlickClass(l4.length, slickLimit)}
        >
          {l4.map((e: any) => (<AttractionOverview key={e.id} {...e}/>))}
        </Slider>
      </div>}
      </>
    )
  }

  return (
    <>
    <div className="dinings-browsing flex">
      <div className="w-fit min-w-fit flex flex-col">
        <div className="h-32 bg-color-primary mb-5 rounded-lg">
          This is map here
        </div>

        <div className="bg-white w-[13.5rem] h-fit mb-5 px-7 py-5 rounded-lg border border-solid border-color-border-secondary">
          <Collapse 
            items={collapseItems} 
            defaultActiveKey={['types']}
            expandIconPosition="end"
            ghost
            size="large"
          />
        </div>
      </div>

      <div className="ml-8 flex flex-col flex-grow max-w-[calc(100%-19rem)]">
        {
          isEmptyFilter()
          ? <div className="">
            {generatePopularList()}
          </div>

          : <div>
            <div className="flex mb-4 items-center justify-between">
              <h2 className="m-0 font-semibold">
                {"Matching attractions for you "}
              </h2>
              <div>
                Sort by: Popular
              </div>
            </div>

            <div className="mb-8">
              <span className="font-medium mr-1">{queriedList.length}</span>
              {"result(s) match your filters"}
              <span className="ml-2 font-medium text-sm underline cursor-pointer"
                onClick={() => navigate("")}
              >
                Clear all filters
              </span>
            </div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              {queriedList.map(e => (
                <AttractionOverview key={e.id} {...e}/>
              ))}
            </div>
            
          </div>
        }
      </div>
    </div>
    <TripListDrawer/>
    </>
  )
}