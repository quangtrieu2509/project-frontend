import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Location } from "../../pages/Admin/Locations"
import { Item } from "../../pages/Admin/Items"
import { Review } from "../../pages/Admin/Reviews"

// Define a type for the slice state
interface AdminState {
  newLocState: boolean
  editLocState: boolean
  detailLoc?: Location
  detailItem?: Item
  detailReview?: Review
  locList: Location[]
  itemList?: Item[]
  reviewList?: Review[]
}

// Define the initial state using that type
const initialState: AdminState = {
  newLocState: false,
  editLocState: false,
  locList: []
}

export const adminSlice = createSlice({
  name: "admin",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNewLocState: (state, action: PayloadAction<boolean>) => {
      state.newLocState = action.payload
    },
    setEditLocState: (state, action: PayloadAction<boolean>) => {
      state.editLocState = action.payload
    },
    setDetailLoc: (state, action: PayloadAction<Location | undefined>) => {
      state.detailLoc = action.payload
    },
    setDetailItem: (state, action: PayloadAction<Item | undefined>) => {
      state.detailItem = action.payload
    },
    setDetailReview: (state, action: PayloadAction<Review | undefined>) => {
      state.detailReview = action.payload
    },
    setLocList: (state, action: PayloadAction<Location[] | Location>) => {
      const { payload } = action
      if (Array.isArray(payload)) state.locList = payload
      else state.locList = [...state.locList, payload]
    },
    setItemList: (state, action: PayloadAction<Item[] | undefined>) => {
      state.itemList = action.payload
    },
    setReviewList: (state, action: PayloadAction<Review[] | undefined>) => {
      state.reviewList = action.payload
    },
    updateLocList: (state, action: PayloadAction<Location>) => {
      state.locList = state.locList.map(e => 
        e.id === action.payload.id ? action.payload : e
      )
    },
    removeFromItemList: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.itemList = state.itemList?.filter(e => e.id !== id)
    },
    removeFromReviewList: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.reviewList = state.reviewList?.filter(e => e.id !== id)
    }
  }
})

export const { 
  setNewLocState,
  setEditLocState,
  setDetailLoc,
  setDetailItem,
  setDetailReview,
  setLocList,
  setItemList,
  setReviewList,
  updateLocList,
  removeFromItemList,
  removeFromReviewList
} = adminSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.adminReducer

export default adminSlice.reducer
