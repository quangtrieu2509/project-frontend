import { EnvironmentOutlined, MinusCircleOutlined } from "@ant-design/icons";
import NoResult from "../../Profile/NoResult";
import { useDispatch, useSelector } from "react-redux";
import { getState, setCreateDestinations, updateCreateDescription } from "../../../redux/Trip/index copy";
import TextArea from "antd/es/input/TextArea";

export interface Destination {
  text: string
  placeName: string
  coordinates: number[]
  description: string
}

export default function Destinations() {
  const destinations = useSelector(getState)
                        .create.destinations as Destination[]
  const dispatch = useDispatch()

  const handleRemove = (index: number) => {
    dispatch(setCreateDestinations(
        [
          ...destinations.slice(0, index), 
          ...destinations.slice(index + 1)
        ]
      )
    )
  }


  return (
    <div className="font-normal w-full">
      {
        destinations.length === 0
        ? <div className="min-h-[24rem] mt-1"><NoResult/></div>
        : <div className="min-h-[24rem] mt-1">
          {
            destinations.map((des, index) => {
              return (
                <div key={index}  className="flex">
                  <div className="flex flex-col items-center">
                    <div className=" h-6 w-6 font-semibold bg-black rounded-full text-white text-center flex items-center justify-center">{index + 1}</div>
                    <div className="h-full w-0 my-1 border-dotted border-0 border-r-4 border-dividerFill"></div>
                  </div>
                  <div className="w-full ml-4 mb-5">
                    <div className="flex justify-between pb-3">
                      <div className=" mr-4 flex flex-col justify-around">
                        <div className=" font-semibold text-base">{des.text}</div>
                        <div><EnvironmentOutlined className="mr-1.5"/>{des.placeName}</div>
                      </div>
                      
                      <div 
                        className="flex items-center text-xl px-3 my-1 rounded cursor-pointer hover:text-red-700 hover:bg-buttonHover smooth-trans"
                        onClick={() => handleRemove(index)}
                      >
                        <MinusCircleOutlined/>
                      </div>
                    </div>
                    <TextArea 
                      rows={3} 
                      placeholder="How's this destination?" 
                      value={des.description}
                      onChange={(e) => {
                        // des.description = e.target.value
                        // console.log(des.description)
                        const payload = { index, content: e.target.value }
                        dispatch(updateCreateDescription(payload))
                      }}
                    />
                  </div>
                </div>
              )
            })
          }
          <div className=" font-semibold w-fit border-solid border-2 border-black rounded-full px-3 py-1">End</div>
        </div>
      }    
    </div>
  )
}