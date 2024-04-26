import { Checkbox, Collapse, CollapseProps, Rate } from "antd";
import Slider from "react-slick";
import "./index.style.scss"
import { diningFeatures, diningPrices, diningTypes, diningMeals } from "../../../constants";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DiningOverview from "../../../components/Item/DinningOverview";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  className: "react-slick-item"
}

export default function Browsing() {
  const navigate = useNavigate()
  const [types, setTypes] = useState<string[]>([])
  const [mealTypes, setMealTypes] = useState<string[]>([])
  const [prices, setPrices] = useState<string[]>([])
  const [rates, setRates] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])

  const [queries] = useSearchParams()

  useEffect(() => {
    const getQueryParams = (key: string) => queries.get(key)?.split(",") ?? []
    setTypes(getQueryParams("types"))
    setMealTypes(getQueryParams("mealTypes"))
    setPrices(getQueryParams("prices"))
    setRates(getQueryParams("rates"))
    setFeatures(getQueryParams("features"))
    


  }, [queries])

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
        options={diningTypes.map((e) => {
          return {
            label: e.value, value: e.key
          }
        })}
        className="flex flex-col mb-2"
        onChange={(e) => setQueryParams("types", e)}
        value={types}
      />
    },
    {
      key: 'mealTypes',
      label: 'Meals',
      children: <Checkbox.Group
        options={diningMeals.map((e) => {
          return {
            label: e.value, value: e.key
          }
        })}
        className="flex flex-col mb-2"
        onChange={(e) => setQueryParams("mealTypes", e)}
        value={mealTypes}
      />
    },
    {
      key: 'prices',
      label: 'Prices',
      children: <Checkbox.Group
        options={diningPrices.map((e) => {
          return {
            label: `${e.value} - ${e.key}`, value: e.key
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
        options={diningFeatures.map((e) => {
          return {
            label: e.value, value: e.key
          }
        })}    
        className="flex flex-col"
        onChange={(e) => setQueryParams("features", e)}
        value={features}
      />
    }
  ]

  const isEmptyFilter = () => {
    return (types.length === 0
    && mealTypes.length === 0
    && prices.length === 0
    && rates.length === 0
    && features.length === 0)
    ? true
    : false
  }

  const generatePopularList = (title: string) => {
    return (
      <div className="mb-8">
        <h2 className="mb-4 mt-0 font-semibold">{title}</h2>
        <Slider {...settings}>
          <DiningOverview/>
          <DiningOverview/>
          <DiningOverview/>
          <DiningOverview/>
          <DiningOverview/>
          <DiningOverview/>
        </Slider>
      </div>
    )
  }

  return (
    <div className="dinings-browsing flex">
      <div className="w-fit min-w-fit flex flex-col">
        <div className="h-32 bg-color-primary mb-5 rounded-lg">
          This is map here
        </div>

        <div className="bg-white w-52 h-fit px-8 py-5 rounded-lg border border-solid border-color-border-secondary">
          <Collapse 
            items={collapseItems} 
            defaultActiveKey={['types', 'mealTypes', 'prices', 'rates', 'features']}
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
            {generatePopularList("Restaurants")}
            {generatePopularList("Coffee & Tea")}
            {generatePopularList("Dinner")}
            {generatePopularList("Cheap Eats")}
            {generatePopularList("5 Stars Rate")}
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
              <span className="font-medium mr-1">{1000}</span>
              {"results match your filters"}
              <span className="ml-2 font-medium text-sm underline cursor-pointer">
                Clear all filters
              </span>
            </div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              <DiningOverview/>
              <DiningOverview/>
              <DiningOverview/>
              <DiningOverview/>
              <DiningOverview/>
              <DiningOverview/>
              <DiningOverview/>
            </div>
            
          </div>
        }
      </div>

    </div>
  )
}