import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../pagesImpl/components/commonTypes'

export const prospectListSlice = createSlice({
  name: 'prospectList',
  initialState: {
    list: [],
  },
  reducers: {
    edit: (state, payload) => {

    },
    add: (state, action) => {
    },

    delete: (state, action) => {
    }
  },
})

// Action creators are generated for each case reducer function
export const { edit, add, delete } = prospectListSlice.actions

export default prospectListSlice.reducer