import axios from 'axios';
import { add, addMany, IEatenItemActionPayload, selectItemToAdd } from '../slices/currentDaySlice';
import { apiBaseUri } from '../../pagesImpl/components/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunk } from '../store';

// Get current day
export const loadCurrentDay = () : AppThunk => async (dispatch: any) => {
    const response = await axios.get(apiBaseUri + '/day');


    if (response.status === 200) {  
        const data = response.data;
        dispatch(addMany({item: data}));
    }

}

export const addItemToAdd = () : AppThunk => async (dispatch: any) => {

    const itemToAdd :  IEatenItemActionPayload  = useSelector(selectItemToAdd);

    const response = await axios({
        url: apiBaseUri + '/day',
        method: 'post',
        data: { itemToAdd
            },
            
    });
}


// Add item to current day

// Edit item in current day

// Delete item from current day