import NoResult from "../../Profile/NoResult"
import { useDispatch, useSelector } from "react-redux"
import { getState, setPreAddState } from "../../../redux/Trip"
import { SavedItemProps } from "../../Item/SavedItem"
import { filterItems } from "../../../constants"
import { useEffect, useState } from "react"
import { Drawer, Form, Rate } from "antd"
import PreAddForm from "../../Form/PreAddForm"

interface SavesListProps {
  day: number
}

export default function SavesList (props: SavesListProps) {
  const dispatch = useDispatch()
  const savesList = useSelector(getState).savesList as SavedItemProps[]
  const { preAddState } = useSelector(getState)
  const [list, setList] = useState<SavedItemProps[]>(savesList)
  const [filter, setFilter] = useState<string>(filterItems[0].type)
  const [selected, setSelected] = useState<SavedItemProps>()
  const [form] = Form.useForm()

  const handleOpenPreAdd = async (item: SavedItemProps) => {
    dispatch(setPreAddState(true))
    setSelected(item)
  }

  const onPreAddClose = () => {
    dispatch(setPreAddState(false))
    setSelected(undefined)
  }

  useEffect(() => {
    if (filter === filterItems[0].type) setList(savesList)
    else {
      // const newList: SavedItemProps[] = []
      // savesList.forEach((e) => {
      //   if (e.item.type === filter) newList.push(e)
      // })
      console.log(savesList.filter(e => e.item.type === filter))
      setList(savesList.filter(e => e.item.type === filter))
    }
  }, [filter, savesList])

  const generateFilter = () => {
    return filterItems.map((e, i) => (
      <div key={i}>
        <div 
          className="primary-outlined-button"
          style={{ 
            borderRadius: "999px", 
            borderColor: `var(--color-${filter === e.type ? "secondary" : "border-primary"})` 
          }}
          onClick={() => setFilter(e.type)}
        >
          {e.label}
        </div>
      </div>
    ))
  }

  return (
    <div>
      <h1 className="mt-0">Add to <span className=" text-color-extra-tertiary">{`Day ${props.day}`}</span></h1>
      <div className="flex justify-between mb-6">
        {generateFilter()}
      </div>
      {
        !list.length
        ? <NoResult/>
        : <div>
          {
            list.map((e) => (
              <div key={e.id} 
                className="flex mb-6 p-3 border border-solid border-color-border-primary rounded-lg cursor-pointer hover:bg-color-hover-primary"
                onClick={() => handleOpenPreAdd(e)}
              >
                <div className="relative flex w-[7.5rem] min-w-[7.5rem] h-[7.5rem]">
                  <img alt="#" src={e.item.image.url} className="image w-full h-full rounded-[7px] object-cover object-center" />
                </div>
                <div className="ml-4 w-full flex flex-col justify-between overflow-hidden">
                  <div className="mb-2">
                    <div className="mb-2">
                      <div className="text-lg font-semibold ellipsis">
                        {e.item.name}
                      </div>
                      <div className="flex items-center mb-2">
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
                  {e.note && <div className="text-sm pt-1 flex justify-between border-0 border-t border-solid border-color-border-secondary">
                    <div>
                      <span className="font-medium text-color-extra-text-primary mr-1.5">Note:</span>
                      <span className="text-color-text-secondary">
                        {e.note}
                      </span>
                    </div>
                  </div>}
                </div>
              </div>
            ))
          }  
        </div>
      }
      <Drawer
        title="Add to Your Itinerary"
        onClose={onPreAddClose}
        open={preAddState} destroyOnClose
        width={500} maskClosable={false}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        footer={
          <div className="flex justify-between p-3">
            <div className="secondary-button" onClick={onPreAddClose}>
              Cancel
            </div>
            <div className="primary-button"
            onClick={() => {
              form.submit()
            }}
            >
              Add
            </div>
          </div>
        }
      >
        {selected && <PreAddForm 
          savedItem={selected} form={form} day={props.day}
        />}
      </Drawer>
    </div>
  )
}