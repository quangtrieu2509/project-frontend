import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IConvo, IMessage } from "../../components/Convo"

// Define a type for the slice state
interface ChatState {
  convosList: IConvo[]
  messageList: IMessage[]
}

// Define the initial state using that type
const initialState: ChatState = {
  convosList: [],
  messageList: []
}

export const chatSlice = createSlice({
  name: "chat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setConvosList: (state, action: PayloadAction<IConvo[]>) => {
      state.convosList = action.payload
    },
    setMessageList: (state, action: PayloadAction<IMessage[]>) => {
      state.messageList = action.payload
    },
    seenConvo: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.convosList = state.convosList.map(e => 
        e.id === id ? { ...e, isSeen: true } : e
      )
    },
    addConvo: (state, action: PayloadAction<IConvo>) => {
      const newConvo = action.payload
      state.convosList = [
        newConvo, 
        ...state.convosList.filter(e => e.id !== newConvo.id)
      ]
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      const newMessage = action.payload
      state.messageList = [...state.messageList, newMessage]
    }
  }
})

export const { 
  setConvosList,
  setMessageList,
  seenConvo,
  addConvo,
  addMessage
} = chatSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const getState = (state: any) => state.chatReducer

export default chatSlice.reducer
