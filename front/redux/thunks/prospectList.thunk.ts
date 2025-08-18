import axios from 'axios';
import { addOne, addMany, replace } from '../slices/prospectListSlice';
import { apiBaseUri, commonAxios } from '../../pagesImpl/components/commonTypes';
import { useDispatch } from 'react-redux';
import { AppThunk } from '../store'; 

/*Prospect List TODO

    Get list
    Search list

    Add meal
    Edit meal
    Delete meal

    Add ingredient
    Edit ingredient
    Delete ingredient

*/
export const getProspectList = () : AppThunk => async (dispatch: any) => {
    
    console.log("Getting prospect list")
    const response = await commonAxios.get('/prospectList' );

    if (response.status === 200) {
        
        const data = response.data;
     



        dispatch( replace({ items: data }) );
    }

}