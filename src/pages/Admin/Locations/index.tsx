import { Breadcrumb, Drawer, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import NoResult from "../../../components/Profile/NoResult";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiCaller, locationApi } from "../../../api";
import "../index.style.scss"
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getState, setDetailLoc, setEditLocState, setLocList, setNewLocState } from "../../../redux/Admin";
import { BreadcrumbItem } from "../../../types";
import NewLocForm from "../../../components/Form/NewLocForm";
import LocationDetail from "../../../components/Drawer/LocationDetail";

export interface Location {
  id: string
  name: string
  coordinates: number[]
  ancestors: any[]
  description: string
  slug: string
  level: number
  images: Array<{
    name: string
    url: string
  }>
}

export default function Locations() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ queries ] = useSearchParams()
  const [breadCrumb, setBreadCrumb] = useState<BreadcrumbItem[]>([])
  const [search, setSearch] = useState<string>("")
  const { newLocState, detailLoc } = useSelector(getState)
  const locList = useSelector(getState).locList as Location[]
  const [newLocForm] = Form.useForm()

  useEffect(() => {
    const getLocationList = async (parentId?: string) => {
      const res = await apiCaller(locationApi.getLocations(parentId))

      if (res !== undefined) {
        dispatch(setLocList(res.data.locations))
        setBreadCrumb(res.data.ancestors)
      }
    }

    const searchLocationList = async (q: string) => {
      const res = await apiCaller(locationApi.searchListLocations(q))

      if (res !== undefined) {
        dispatch(setLocList(res.data))
      }
    }

    const [location, q] = [queries.get("location"), queries.get("q")]

    if (q !== null) searchLocationList(q)
    else getLocationList(location ?? undefined)
  }, [queries])

  const handleGetNewList = (locationId: string) => {
    queries.set("location", locationId)
    queries.delete("q")
    navigate("?" + queries.toString())
  }

  const handleSearch = () => {
    const trimmedSearch = search.trim()
    if (trimmedSearch) {
      navigate("?q=" + trimmedSearch)
    } else setSearch("")
  }

  const handleOnNewLocClose = () => {
    Modal.confirm({
      title: 'Are you sure to cancel?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () { dispatch(setNewLocState(false)) }
    })
  }

  const handleSubmitNewLoc = () => {
    Modal.confirm({
      title: 'Are you sure to create?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk () { newLocForm.submit() }
    })
  }

  const handleOnDetailClose = () => {
    dispatch(setDetailLoc(undefined))
  }

  const generateBCItems = () => {
    const items: any[] = [{
      title: "All",
      onClick: () => {
        queries.delete("location")
        navigate("?" + queries.toString())
      }
    }]

    breadCrumb.forEach(e => {
      items.push({
        title: e.name,
        onClick: () => {
          queries.set("location", e.id)
          navigate("?" + queries.toString())
        }
      })
    })

    return items
  }

  const currLocation = breadCrumb[breadCrumb.length - 1]?.name

  return (
    <div>
      <h2 className="mt-0">Locations</h2>
      <div className="flex min-w-[62.5rem] justify-between mb-5">
        <div className="flex items-center gap-2">
          <Input className=" w-80 py-2" value={search} 
            onChange={e => setSearch(e.target.value)} allowClear
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />
          <div className="primary-outlined-button"
            style={{
              borderRadius: "99px"
            }}
            onClick={handleSearch}
          >
            Search
          </div>
        </div>
        {!queries.get("q") && <div className="primary-button" onClick={() => dispatch(setNewLocState(true))}>
          {
            !breadCrumb.length
            ? "New location"
            : <div>
              <PlusOutlined/>
              <span className="mx-1 font-normal">to</span>
              <span>{currLocation}</span>
            </div>
          }
        </div>}
      </div>
      <div className="text-color-text-primary">
        {!queries.get("q") && <Breadcrumb
          separator=">"
          items={generateBCItems()}
          className="mb-5"
        />}
        {!locList.length 
        ? <NoResult/>
        : locList.map(e => (
          <div key={e.id} className="flex box-border w-full justify-between items-center py-3 px-2 hover:bg-color-hover-primary">
            <div className="flex-grow cursor-pointer hover:underline font-medium"
              onClick={() => handleGetNewList(e.id)}
            >
              {e.name}
            </div>
            <div className="text-sm border border-solid rounded-md px-1 py-0.5 cursor-pointer hover:underline"
              onClick={() => dispatch(setDetailLoc(e))}
            >
              See detail
            </div>
          </div>
        ))}
      </div>
      <Drawer
        title={ !breadCrumb.length ? "New location" : `New location to ${currLocation}` }
        onClose={handleOnNewLocClose} maskClosable={false}
        open={newLocState} width={500} destroyOnClose
        footer={
          <div className="flex justify-between p-3">
            <div className="secondary-button" 
              onClick={handleOnNewLocClose}
            >
              Cancel
            </div>
            <div className="primary-button"
              onClick={handleSubmitNewLoc}
            >
              Create location
            </div>
          </div>
        }
      >
        <NewLocForm form={newLocForm} ancestors={breadCrumb}/>
      </Drawer>
      <Drawer
        title={"Location Detail"}
        onClose={handleOnDetailClose}
        open={detailLoc} width={550}
        destroyOnClose
        footer={
          <div className="flex justify-between p-3">
            <div className="secondary-button" 
              onClick={handleOnDetailClose}
            >
              Cancel
            </div>
            <div className="primary-button"
              onClick={() => {
                dispatch(setEditLocState(true))
              }}
            >
              Edit
            </div>
          </div>
        }
      >
        {detailLoc && <LocationDetail {...detailLoc}/>}
      </Drawer>
    </div>
  )
}