import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Auth/userSlice'

const store = configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store