import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { INoti } from "../../components/Header/Noti"

// Define a type for the slice state
interface NotiState {
  count: number
  notisList: INoti[]
}

// Define the initial state using that type
const initialState: NotiState = {
  count: 0,
  notisList: []
}

export const notiSlice = createSlice({
  name: "noti",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
    setNotisList: (state, action: PayloadAction<INoti[]>) => {
      state.notisList = action.payload
    },
    readAllNotis: (state, _action: PayloadAction<void>) => {
      state.notisList = state.notisList.map(e => ({ ...e, isSeen: true }))
    },
    addNoti: (state, action: PayloadAction<INoti>) => {
      const newNoti = action.payload
      state.notisList = [
        newNoti, 
        ...state.notisList.filter(e => e.id !== newNoti.id)
      ]
    },
    readNoti: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.notisList = state.notisList.map(e => 
        (e.id === id ? { ...e, isSeen: true } : e)
      )
    } 
  }
})

export const { 
  setCount,
  setNotisList, 
  readAllNotis, 
  addNoti, 
  readNoti 
} = notiSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.notiReducer

export default notiSlice.reducer
