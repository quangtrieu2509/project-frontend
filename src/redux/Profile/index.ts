import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserOverview } from "../../pages/Profile"

// Define a type for the slice state
interface ProfileState {
  introInfo: IntroInfo
  interactModalState: boolean
  interactUserList: UserOverview[]
}

interface IntroInfo {
  bio?: string
  address?: string
  createdAt: Date
  links?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    tiktok?: string
  }
  
}

// Define the initial state using that type
const initialState: ProfileState = {
  introInfo: {
    createdAt: new Date()
  },
  interactModalState: false,
  interactUserList: []
}

export const profileSlice = createSlice({
  name: "profile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIntroInfo: (state, action: PayloadAction<IntroInfo>) => {
      state.introInfo = action.payload
    },
    setInteractModalState: (state, action: PayloadAction<boolean>) => {
      state.interactModalState = action.payload
    },
    setInteractUserList: (state, action: PayloadAction<UserOverview[]>) => {
      state.interactUserList = action.payload
    }
  }
})

export const { 
  setIntroInfo, 
  setInteractModalState, 
  setInteractUserList 
} = profileSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.profileReducer

export default profileSlice.reducer
