import axios from 'axios';
import { add } from '../slices/currentDaySlice';
import { apiBaseUri } from '../../pagesImpl/components/commonTypes';
import { useDispatch } from 'react-redux';
import { AppThunk } from '../store';

// Get current day
export const loadCurrentDay = () : AppThunk => async (dispatch: any) => {
    const response = await axios.get(apiBaseUri + '/currentDay');


    if (response.status === 200) {
        const data = response.data;
        dispatch(add);
    }

}


// Add item to current day

// Edit item in current day

// Delete item from current day