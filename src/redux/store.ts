import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./Auth"
import { headerSlice } from "./Header"
import { tripSlice } from "./Trip"
import { profileSlice } from "./Profile"
import { loaderSlice } from "./Loader"
import { businessSlice } from "./Business"
import { notiSlice } from "./Noti"
import { chatSlice } from "./Chat"
import { mapSlice } from "./Map"
import { adminSlice } from "./Admin"
import { itemSlice } from "./Item"


export default configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    headerReducer: headerSlice.reducer,
    profileReducer: profileSlice.reducer,
    tripReducer: tripSlice.reducer,
    loaderReducer: loaderSlice.reducer,
    businessReducer: businessSlice.reducer,
    notiReducer: notiSlice.reducer,
    chatReducer: chatSlice.reducer,
    mapReducer: mapSlice.reducer,
    adminReducer: adminSlice.reducer,
    itemReducer: itemSlice.reducer
  }
})
