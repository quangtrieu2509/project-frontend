import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { INoti } from "../../components/Header/Noti"

// Define a type for the slice state
interface NotiState {
  notisList?: INoti[]
  notiState: boolean
}

// Define the initial state using that type
const initialState: NotiState = {
  notiState: false
}

export const notiSlice = createSlice({
  name: "noti",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotisList: (state, action: PayloadAction<INoti[] | undefined>) => {
      state.notisList = action.payload
    },
    setNotiState: (state, action: PayloadAction<boolean>) => {
      state.notiState = action.payload
    },
    readAllNotis: (state, _action: PayloadAction<void>) => {
      if (state.notisList !== undefined) {
        state.notisList = state.notisList.map(e => ({ ...e, isSeen: true }))
      }
    },
    addNoti: (state, action: PayloadAction<INoti>) => {
      if (state.notisList !== undefined) {
        const newNoti = action.payload
        state.notisList = [
          newNoti, 
          ...state.notisList.filter(e => e.id !== newNoti.id)
        ]
      }

    },
    readNoti: (state, action: PayloadAction<string>) => {
      if (state.notisList !== undefined) {
        const id = action.payload
        state.notisList = state.notisList.map(e => 
          (e.id === id ? { ...e, isSeen: true } : e)
        )
      }
    } 
  }
})

export const {
  setNotisList, 
  setNotiState,
  readAllNotis, 
  addNoti, 
  readNoti 
} = notiSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.notiReducer

export default notiSlice.reducer
