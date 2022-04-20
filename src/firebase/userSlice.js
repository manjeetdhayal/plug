import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
  name: 'user',
  initialState: {
      user: null, 
  },
  reducers: {
      setUser: (state, action) => {
          state.user = action.payload; 
      }
  }
});

export const { setUser } = userSlice.actions

//a selector function which allows us to select a value from the state user 
export const selectUser = state => state.firebase.user; 

export default userSlice.reducer