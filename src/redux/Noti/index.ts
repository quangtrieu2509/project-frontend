import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Noti } from "../../components/Drawer/Notis"

// Define a type for the slice state
interface NotiState {
  notisList: Noti[]
}

// Define the initial state using that type
const initialState: NotiState = {
  notisList: []
}

export const notiSlice = createSlice({
  name: "noti",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotisList: (state, action: PayloadAction<Noti[]>) => {
      state.notisList = action.payload
    },
    readAllNotis: (state, _action: PayloadAction<void>) => {
      state.notisList = state.notisList.map(e => ({ ...e, isSeen: true }))
    },
    addNoti: (state, action: PayloadAction<Noti>) => {
      state.notisList = [action.payload, ...state.notisList]
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
  setNotisList, 
  readAllNotis, 
  addNoti, 
  readNoti 
} = notiSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.notiReducer

export default notiSlice.reducer
