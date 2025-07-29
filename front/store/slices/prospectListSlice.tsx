import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../pagesImpl/components/commonTypes'

export const prospectListSlice = createSlice({
  name: 'prospectList',
  initialState: {
     list  : [],
  },
  reducers: {
    update: (state) => {
    
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { update } = prospectListSlice.actions

export default prospectListSlice.reducer