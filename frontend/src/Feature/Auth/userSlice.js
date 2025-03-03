import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:{email:"", userId:""},
    isAuthenticated:false,
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state , action){
            state.user ={
                email:action.payload.email,
                userId:action.payload.userId
            }
            state.isAuthenticated = true
        },
        logout(state){
            state.user = {}
            state.isAuthenticated = false
        }
    }
})

export const {setUser , logout }= authSlice.actions;
export default authSlice.reducer;