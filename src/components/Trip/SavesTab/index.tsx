import { Collapse, CollapseProps } from "antd"
import './index.style.scss'
import SavedItem from "../../Item/SavedItem";
import { ROUTES, categoryItems } from "../../../constants";
import { JSX } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { getState } from "../../../redux/Trip";
import { useNavigate } from "react-router-dom";

export default function SavesTab() {
  const navigate = useNavigate()
  const savesList = useSelector(getState).savesList as any[]

  type CategoryItem = {
    key: string, 
    label: string, 
    type: string
  }
  const generateCollapseItem = (item: CategoryItem) => {
    const results: JSX.Element[] = []
    savesList.forEach((e, i) => {
      if (e.item.type === item.type){
        results.push(<SavedItem {...e} key={i}/>)
      }
    })
    return { 
      key: item.key, 
      label: `${item.label} (${results.length})`, 
      children: results 
    }
  }

  const collapseItems: CollapseProps['items'] = categoryItems.map(e => generateCollapseItem(e))
  
  return (
    <div className="trip-detail-saves-tab text-base mt-2">
      <div className="flex justify-between items-end">
        <div>
          {`${savesList.length} items`}
        </div>
        <div 
          className="primary-button"
          style={{ fontWeight: 500, borderRadius: 9999 }}
          onClick={() => alert("handle find and save")}
        >
          <i className="bi bi-search mr-2 text-sm"/>
          Find and save
        </div>
      </div>
      {
        savesList.length === 0
        ? <div className="my-8 flex flex-col items-center">
          <div className="mt-8 mb-6 text-color-text-secondary">
            {"Nothing saved yet! When you save an item, you'll find it here."}
          </div>
          <div 
            className="primary-outlined-button hover:bg-color-hover-primary"
            style={{ borderRadius: 9999 }}
            onClick={() => navigate(ROUTES.SEARCH)}  
          >
            Start Exploring
          </div>
        </div>
        : <div className="mt-8">
          <Collapse 
            items={collapseItems}
            defaultActiveKey={collapseItems.map(e => e.key as string)}
            expandIconPosition="end"
            ghost
            size="large"
          />
        </div>
      }
    </div>
  )
}