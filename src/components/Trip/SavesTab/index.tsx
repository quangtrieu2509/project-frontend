import { Collapse, CollapseProps } from "antd"
import './index.style.scss'
import ItemInTrip from "../../Item/ItemInTrip";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const itemtests: CollapseProps['items'] = [
  {
    key: 'attractions',
    label: 'Attractions & Destinations',
    children: <ItemInTrip/>,
  },
  {
    key: 'accommodations',
    label: 'Accommodations',
    children: <div className="mb-6">{text}</div>,
  },
  {
    key: 'dinnings',
    label: 'Dinnings',
    children: <div className="mb-6">{text}</div>,
  },
  {
    key: 'activities',
    label: 'Activities',
    children: <div className="mb-6">{text}</div>,
  }
]

export default function SavesTab() {
  const items = [1]
  return (
    <div className="trip-detail-saves-tab text-base mt-2">
      <div className="flex justify-between items-end">
        <div>
          {`${items.length} items`}
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
        items.length === 0
        ? <div className="my-8 flex flex-col items-center">
          <div className="mt-8 mb-6 text-color-text-secondary">
            {"Nothing saved yet! When you save an item, you'll find it here."}
          </div>
          <div 
            className="primary-outlined-button hover:bg-color-hover-primary"
            style={{ borderRadius: 9999 }}
            onClick={() => alert("handle start explore")}  
          >
            Start Exploring
          </div>
        </div>
        : <div className="mt-8">
          <Collapse 
            items={itemtests} 
            defaultActiveKey={['attractions', 'accommodations', 'dinnings', 'activities']}
            expandIconPosition="end"
            ghost
            size="large"
          />
        </div>
      }
    </div>
  )
}