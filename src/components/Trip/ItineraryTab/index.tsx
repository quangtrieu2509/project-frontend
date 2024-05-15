import { Collapse, CollapseProps, Drawer, Rate } from "antd"
import './index.style.scss'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiCaller, tripApi } from "../../../api";
import { separateItemsByDay } from "../../../utils/Trip";
import { PlusOutlined } from "@ant-design/icons";
import SavesList from "../../Drawer/SavesList";
import { SavedItemProps } from "../../Item/SavedItem";
import { useDispatch, useSelector } from "react-redux";
import { getState, setEditState, setItineraryList } from "../../../redux/Trip";
import { generateIconType } from "../../../utils/Utils";
import ItineraryItemDetail from "../../Drawer/ItineraryItemDetail";

interface ItineraryTabProps {
  tripLength: number
}

export interface ItineraryItem extends SavedItemProps {
  id: string
  savedItemId: string
  tripId: string
  day: number
  orderNumber: number
  hasBooked?: boolean
  startTime?: string
  note?: string
  numOfGuests?: number
  reservationNumber?: string
}

export default function ItineraryTab(props: ItineraryTabProps) {
  const dispatch = useDispatch()
  const itineraryList = useSelector(getState)
                          .itineraryList as Array<Array<ItineraryItem>>
  const [savesListState, setSavesListState] = useState<boolean>(false)
  const [itemDetailState, setItemDetailState] = useState<boolean>(false)
  const [selectedDay, setSelectedDay] = useState<number>(1)
  
  type Args = {day: number, order: number}
  const [selectedItem, setSelectedItem] = useState<Args>()
  // const [savesAdded, setSavesAdded] = useState<number>(0)
  const params = useParams()

  useEffect(() => {
    const getItems = async () => {
      const res = await apiCaller(tripApi.getItineraryItems(params.id ?? ""))

      if (res !== null) {
        console.log(separateItemsByDay(res.data, props.tripLength))
        dispatch(
          setItineraryList(separateItemsByDay(res.data, props.tripLength))
        )
      }
    }

    getItems()
  }, [params.id, props.tripLength])

  const onSavesListOpen = (key: number) => {
    setSelectedDay(key + 1)
    setSavesListState(true)
  }
  const onItemDetailOpen = (day: number, order: number) => {
    setItemDetailState(true)
    setSelectedItem({ day, order })
  }
  const onSavesListClose = () => {
    setSavesListState(false)
  }
  const onItemDetailClose = () => {
    setItemDetailState(false)
  }

  const addButton = (key: number) => (
    <div 
      className="primary-outlined-button w-fit"
      style={{ borderRadius: "999px", paddingLeft: "0.75rem" }}
      onClick={() => onSavesListOpen(key)}
    >
      <PlusOutlined className="mr-1.5"/>Add
    </div>
  )

  const generateCollapseItem = (items: ItineraryItem[], key: number) => {
    if (items.length === 0) return (
      <div className="mb-6">
        <div className="flex h-16">
          <div className="w-fit h-full flex flex-col items-center ml-1 mr-9">
            <div className="w-fit h-fit px-[7px] py-[2px] border border-solid border-color-secondary rounded-full">
              <i className="bi bi-clipboard-plus text-lg"/>
            </div>
            <div className="h-full w-px bg-color-secondary"/>
          </div> 
          <div className="w-full h-[2.125rem] text-color-text-tertiary flex items-center">
            <span>Nothing planned. Let's add from your saves.</span>
          </div>
        </div>
        <div>
          {addButton(key)}
        </div>
      </div>
    )
    else return (
      <div className="mb-6">
        {items.map((e, i) => (
          <div key={i} className="flex h-0 min-h-[12.875rem]">
            <div className="w-fit h-full flex flex-col items-center ml-1 mr-9">
              <div className="w-fit h-fit px-1.5 py-0.5 border border-solid border-color-secondary rounded-full">
                <i className={`bi bi-${generateIconType(e.item.type)} text-xl`}/>
              </div>
              <div className="h-full w-px bg-color-secondary"/>
            </div> 
            <div className="flex mb-7 w-full p-4 border border-solid border-color-border-primary rounded-lg overflow-hidden">
              <div className="relative flex w-36 min-w-[9rem] h-36 cursor-pointer"
                onClick={() => onItemDetailOpen(e.day, i)}
              >
                <img alt="#" src={e.item.image} className="image w-full h-full rounded-[7px] object-cover object-center" />
              </div>
              <div className="relative ml-4 w-full flex flex-col justify-between overflow-hidden">
                {e.hasBooked && <i className="bi bi-calendar2-check text-base absolute top-0 right-0 text-color-primary"/>}
                <div className="mb-1">
                  <div className="mb-1">
                    <div className="text-lg font-semibold cursor-pointer hover:underline ellipsis"
                      onClick={() => onItemDetailOpen(e.day, i)}
                    >
                      {e.item.name}
                    </div>
                    <div className="flex items-center">
                      <Rate 
                        allowHalf 
                        disabled 
                        defaultValue={e.item.review.rate} 
                        className="text-color-primary text-base mr-4"
                      />
                      <span className="text-sm text-color-text-secondary">{e.item.review.total}</span>
                    </div>
                  </div>
                  <div className="text-sm text-color-text-secondary">
                    {e.item.categories.join("-")}
                  </div>
                </div>
                <div className="text-sm pt-1 border-0 border-t border-solid border-color-border-secondary">
                  <div className="flex">
                    {e.startTime && <div className="mr-10">
                      <i className="bi bi-clock mr-2 pl-px text-color-extra-text-primary"/>
                      <span className="text-color-text-secondary font-medium">{e.startTime}</span>
                    </div>}
                    {e.numOfGuests && <div className="mr-10">
                      <i className="bi bi-people mr-2 pl-px text-color-extra-text-primary"/>
                      <span className="text-color-text-secondary">{e.numOfGuests}</span>
                    </div>}
                  </div>
                  {e.reservationNumber && <div className="flex">
                    <i className="bi bi-journal-check mr-2 pl-px text-color-extra-text-primary"/>
                    <span className="text-color-text-secondary ellipsis">{e.reservationNumber}</span>
                  </div>}
                  {e.note && <div className="flex">
                    <span className="font-medium text-color-extra-text-primary mr-1.5">Note:</span>
                    <span className="text-color-text-secondary ellipsis">{e.note}</span>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>
          {addButton(key)}
        </div>
      </div>
    )
  }

  const collapseItems: CollapseProps['items'] = itineraryList.map((items, key) => 
    ({
      key: key,
      label: `Day ${key + 1}`,
      children: generateCollapseItem(items, key)
    }))
  
  return (
    <>
    <div className="trip-detail-itinerary-tab text-base mt-2">
      <div className="flex justify-between items-end">
        <div>
          {`0/3 saves added`}
        </div>
        <div 
          className="primary-button"
          style={{ fontWeight: 500, borderRadius: 9999 }}
          onClick={() => alert("handle edit")}
        >
          Edit
        </div>
      </div>
      {itineraryList.length !== 0 && <div className="mt-8">
        <Collapse 
          items={collapseItems} 
          defaultActiveKey={itineraryList.map((_, i) => i)}
          expandIconPosition="end"
          ghost
          size="large"
        />
      </div>}
    </div>
    <Drawer
      title="My Saves" destroyOnClose
      onClose={onSavesListClose}
      open={savesListState}
      width={550}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <SavesList day={selectedDay}/>
    </Drawer>
    <Drawer
      title={"Detail"} destroyOnClose
      onClose={onItemDetailClose}
      open={itemDetailState}
      width={500}
      styles={{
        body: {
          paddingBottom: 80,
        }
      }}
      footer={
        <div className="flex justify-end p-3">
          <div className="primary-button"
          onClick={() => {
            dispatch(setEditState(true))
          }}
          >
            Edit
          </div>
        </div>
      }
    >
      {selectedItem && <ItineraryItemDetail 
        itineraryItem={itineraryList[selectedItem.day - 1][selectedItem.order]}
      />}
    </Drawer>
    </>
  )
}