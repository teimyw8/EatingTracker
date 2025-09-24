import { combineReducers, createSelector, createSlice } from '@reduxjs/toolkit'
import { DisplayableItem, DisplayListType, Meal } from '../../pagesImpl/components/commonTypes'
import { RootState } from '../store'





export interface ProspectListState {
  list: Array<DisplayableItem>
}

const initialState = (): ProspectListState => {
  return {
    list: [{ type: 1, ingr: { name: 'dummyIngr', serv: 2, servOz: undefined, c: undefined, f: undefined, cal: 100, p: 10 }, isClicked: false }]

  }
}


export const prospectListSlice = createSlice({
  name: 'prospectList',
  initialState: initialState(),
  reducers: {
    edit: (state, action) => {

      const { item, index } = action.payload;

      if (index < 0 || index >= state.list.length) {

        throw new Error(`Edit Prospect List : Index ${index} is out of bounds for the list of length ${state.list.length}`);
      } else {

        state.list[index] = item;
      }
    },

    addOne: (state, action) => {

      const item: DisplayableItem = action.payload.item;
      state.list.push(item);
    },
    addMany: (state, action) => {
      const items: Array<DisplayableItem> = action.payload.items;
      state.list.push(...items);
    },
    replace: (state, action) => {
      const items: Array<DisplayableItem> = action.payload.items;
      state.list = items;
    },

    del: (state, action) => {

      const index = action.payload.index;
      const toDelete = state.list[index];
      state.list = state.list.filter((item: DisplayableItem) => item !== toDelete);
    },
    click: (state, action) => {
      const index = action.payload.index;
      if (index < 0 || index >= state.list.length) {
        throw new Error(`Click Prospect List : Index ${index} is out of bounds for the list of length ${state.list.length}`);
      } else {
        state.list[index].isClicked = !state.list[index].isClicked;
      }
    }
  },
})

const prospectList = (state: RootState): ProspectListState => state.prospectList;


export const selectList = createSelector(prospectList, state => state.list);

export const { edit, addOne, addMany, replace, del, click } = prospectListSlice.actions;

export const prospectListReducer = prospectListSlice.reducer;