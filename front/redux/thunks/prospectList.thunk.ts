import axios from 'axios';
import { addOne, addMany, replace } from '../slices/prospectListSlice';
import { apiBaseUri, Meal } from '../../pagesImpl/components/commonTypes';
import { useDispatch } from 'react-redux';
import { AppThunk } from '../store'; 
import { url } from 'inspector';

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
    const response = await axios({
        url: apiBaseUri + '/prospectList',
        method: 'get',
    });

    if (response.status === 200) {
        
        const data = response.data;
        console.log("Response", response);
     



        dispatch( replace({ items: data }) );

    }

}

export const addMealAndRefreshList = (meal: Meal) : AppThunk => async (dispatch: any) => {
console.log("Adding meal", meal)

        // add ingredients
        for(let mi of meal.ingredientList){
            if(mi.ingr.id == undefined || mi.ingr.id == ''){
                const response = await axios({
                    url: apiBaseUri + '/ingr',
                    method: 'post',
                    data: mi.ingr,
                });
                if (response.status === 200) {
                    const data = response.data;
                    console.log("Added ingredient", data);
                    mi.ingr.id = data.id
                }
            }
        }

    const response = await axios({
        url: apiBaseUri + '/meal',
        method: 'post',
        data: { name: meal.name,
                ingrs: meal.ingredientList},
    });

    if (response.status === 200) {
        
        const data = response.data;
        console.log("Response", response);
     



        dispatch( getProspectList() );

    }
}
