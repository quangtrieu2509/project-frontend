import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// Define a type for the slice state
interface HeaderState {
  isAtHome: boolean
  isAtSearch: boolean
}

// Define the initial state using that type
const initialState: HeaderState = {
  isAtHome: false,
  isAtSearch: false
}

export const headerSlice = createSlice({
  name: "header",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAtHome: (state, action: PayloadAction<boolean>) => {
      state.isAtHome = action.payload
    },
    setIsAtSearch: (state, action: PayloadAction<boolean>) => {
      state.isAtSearch = action.payload
    }
  }
})

export const { setIsAtHome, setIsAtSearch } = headerSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.headerReducer

export default headerSlice.reducer
