import { Checkbox, Collapse, CollapseProps, Rate } from "antd";
import Slider from "react-slick";
import "./index.style.scss"
import { diningFeatures, diningPrices, diningTypes, diningMeals, itemTypes } from "../../../../constants";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DiningOverview, { DiningOverviewProps as Item } from "../../../../components/Item/DiningOverview";
import { apiCaller, itemApi } from "../../../../api";
import { generateSlickClass } from "../../../../utils/Utils";
import TripListDrawer from "../../../../components/Drawer/TripListDrawer";

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
  restaurants: [],
  "coffee-tea": [],
  dinner: [],
  $: []
}

export default function Browsing(props: BrowsingProps) {
  const navigate = useNavigate()
  const [browsingList, setBrowsingList] = useState<BrowsingItem>(browsingInit)
  const [queriedList, setQueriedList] = useState<Item[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [meals, setMeals] = useState<string[]>([])
  const [prices, setPrices] = useState<string[]>([])
  const [rates, setRates] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])

  const [queries] = useSearchParams()

  const isEmptyFilter = () => {
    return (types.length === 0
    && meals.length === 0
    && prices.length === 0
    && rates.length === 0
    && features.length === 0)
    ? true
    : false
  }

  useEffect(() => {
    const getQueryParams = (key: string) => queries.get(key)?.split(",") ?? []
    setTypes(getQueryParams("types"))
    setMeals(getQueryParams("meals"))
    setPrices(getQueryParams("prices"))
    setRates(getQueryParams("rates"))
    setFeatures(getQueryParams("features"))
  }, [queries])

  useEffect(() => {
    const getQueriedList = async (id: string, data: any) => {
      const res = await apiCaller(
        itemApi.getQueriedItems(id, itemTypes.DINING, data)
      )

      if (res !== undefined) {
        console.log(res.data)
        setQueriedList(res.data)
      }
    }

    !isEmptyFilter() 
      && getQueriedList(props.id, { types, meals, prices, rates, features })
  }, [props.id, types, meals, prices, rates, features])

  useEffect(() => {
    const getBrowsingList = async (id: string) => {
      const res = await apiCaller(
        itemApi.getBrowsingItems(id, itemTypes.DINING)
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
        options={Object.entries(diningTypes).map(([key, value]) => {
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
      key: 'meals',
      label: 'Meals',
      children: <Checkbox.Group
        options={Object.entries(diningMeals).map(([key, value]) => {
          return {
            label: value, value: key
          }
        })}
        className="flex flex-col mb-2"
        onChange={(e) => setQueryParams("meals", e)}
        value={meals}
      />
    },
    {
      key: 'prices',
      label: 'Prices',
      children: <Checkbox.Group
        options={Object.entries(diningPrices).map(([key, value]) => {
          return {
            label: `${value} - ${key}`, value: key
          }
        })}
        className="flex flex-col mb-2"
        onChange={(e) => setQueryParams("prices", e)}
        value={prices}
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
    },
    {
      key: 'features',
      label: 'Features',
      children: <Checkbox.Group
        options={Object.entries(diningFeatures).map(([key, value]) => {
          return {
            label: value, value: key
          }
        })}    
        className="flex flex-col"
        onChange={(e) => setQueryParams("features", e)}
        value={features}
      />
    }
  ]

  const generatePopularList = () => {
    const [l1, l2, l3, l4] = [
      browsingList.restaurants, 
      browsingList["coffee-tea"], 
      browsingList.dinner, 
      browsingList.$
    ]
    return (
      <>
      {Boolean(l1.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">{diningTypes.restaurants}</h2>
        <Slider {...settings}
          className={generateSlickClass(l1.length, slickLimit)}
        >
          {l1.map((e: any) => (<DiningOverview key={e.id} {...e}/>))}
        </Slider>
      </div>}
      {Boolean(l2.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">{diningTypes["coffee-tea"]}</h2>
        <Slider {...settings}
          className={generateSlickClass(l2.length, slickLimit)}
        >
          {l2.map((e: any) => (<DiningOverview key={e.id} {...e}/>))}
        </Slider>
      </div>}
      {Boolean(l3.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">{diningFeatures.dinner}</h2>
        <Slider {...settings}
          className={generateSlickClass(l3.length, slickLimit)}
        >
          {l3.map((e: any) => (<DiningOverview key={e.id} {...e}/>))}
        </Slider>
      </div>}
      {Boolean(l4.length) && <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">{diningPrices.$}</h2>
        <Slider {...settings}
          className={generateSlickClass(l4.length, slickLimit)}
        >
          {l4.map((e: any) => (<DiningOverview key={e.id} {...e}/>))}
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

        <div className="bg-white w-52 h-fit mb-5 px-8 py-5 rounded-lg border border-solid border-color-border-secondary">
          <Collapse 
            items={collapseItems} 
            defaultActiveKey={['types', 'meals', 'prices', 'rates', 'features']}
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
                {"Matching dinings for you "}
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
                <DiningOverview key={e.id} {...e}/>
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