import styled from '@emotion/styled';
import React, { use, useEffect, useState } from 'react';

import {
    MealIngr, Ingredient, Meal, OZtoG,
    GtoOZ,
    Fcal,
    Ccal,
    getFontSize,
    StyledInput,
    OperationButton,
    StyledLabel
} from './commonTypes'
import { get } from 'http';

interface errorEntry {
    type: string
    msg: string
}

//TODO fix label font size
// fix meal ingr button 
// 


interface MealEntryProp {
    onSubmit: (meal: Meal) => boolean;
    onCancel: (e: any) => boolean;

}
const MealEntry = ({ onSubmit, onCancel }: MealEntryProp): React.JSX.Element => {
    //TODO maybe use map or some other strucutre for both form values and errors
    //Form values
    const [formValues, setFormValues] = useState(
        {
            ingrName: '',
            c: '',
            f: '',
            p: '',
            cal: '',
            ingrPortion: '',
            ingrPortionOz: '',
            serv: '',
            servOz: '',
        })

    const clearFormValues = () => {
        setFormValues({
            c: '',
            f: '',
            p: '',
            cal: '',
            serv: '',
            servOz: '',
            ingrPortion: '',
            ingrPortionOz: '',
            ingrName: '',
        });
    }

    //Form errors    
    //TODO add error messages based on error state
    const [formError, setFormError] = useState(
        {
            c: '',
            f: '',
            p: '',
            cal: '',
            serv: '',
            servOz: '',
            ingrName: '',
            mealName: '',
            calCalc: '',
            servCalc: ''
        })

    const checkForError = (): boolean => {
        //TODO Better way to do this?

        if (formError.c == '' &&
            formError.f == '' &&
            formError.p == '' &&
            formError.cal == '' &&
            formError.serv == '' &&
            formError.servOz == '' &&
            formError.ingrName == '' &&
            formError.mealName == '' &&
            formError.calCalc == '' &&
            formError.servCalc == '') {
            console.log('no errors')
            return false;
        } else {
            return true;
        }

    }

    const clearFormErrors = () => {
        setFormError(
            {
                c: '',
                f: '',
                p: '',
                cal: '',
                serv: '',
                servOz: '',
                ingrName: '',
                mealName: '',
                calCalc: '',
                servCalc: ''
            })
    }


    //Meal Ingredients
    const [newMeal, setNewMeal] = useState<Meal>(new Meal('', []))
    const setMealName = (mealName: string) => {
        var updateMeal = newMeal;
        updateMeal.name = mealName;
        setNewMeal(updateMeal);
    }

    const getMealName = () => {
        return newMeal.name;
    }
    const getIngredientList = () => {
        return newMeal.ingredientList;
    }






    const submitAddIngr = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('in add ')

        var newIngr: Ingredient = {
            name: formValues.ingrName,
            cal: 0,
            p: 0,
            c: 0,
            f: 0,
            serv: 0,
            servOz: 0,
        }

        var errorCheck = false
        //data type validation
        //TODO maybe format nested ifs better
        //TODO is there a way to do data validation in the form?

        // Checking for empty
        if (formValues.ingrName == '') {
            setFormError({ ...formError, ingrName: 'Name is required' })
            errorCheck = true
        }
        if (formValues.cal == '' && (formValues.c == '' || formValues.f == '')) {
            setFormError({ ...formError, calCalc: 'Must provide either calories or both carbs and fat' })
            errorCheck = true

        } else if (Number.isNaN(formValues.cal)) {
            setFormError({ ...formError, cal: 'Must be a number' })
            errorCheck = true
        } else {
            newIngr.cal = Number(formValues.cal)
        }
        if (Number.isNaN(formValues.c)) {
            if (formValues.c != '') {
                setFormError({ ...formError, c: 'Must be a number' })
                errorCheck = true
            }

        } else {
            newIngr.c = Number(formValues.c)
        }
        if (Number.isNaN(formValues.p)) {
            if (formValues.p != '') {
                setFormError({ ...formError, p: 'Must be a number' })
                errorCheck = true
            }

        } else {
            newIngr.p = Number(formValues.p)
        }
        if (Number.isNaN(formValues.f)) {
            if (formValues.f != '') {
                setFormError({ ...formError, f: 'Must be a number' })
                errorCheck = true
            }

        } else {
            newIngr.f = Number(formValues.f)
        }

        if (formValues.serv == '' && formValues.servOz == '') {
            setFormError({ ...formError, servCalc: 'Must provide serving size in either grams or ounces' })
            errorCheck = true
            if (Number.isNaN(formValues.servOz)) {
                setFormError({ ...formError, servOz: 'Must be a number' })
                errorCheck = true
            } else {
                newIngr.serv = OZtoG * Number(formValues.servOz)
                newIngr.servOz = Number(formValues.servOz)
            }
        } else {
            if (Number.isNaN(formValues.serv)) {
                setFormError({ ...formError, serv: 'Must be a number' })
                errorCheck = true
            } else {
                newIngr.serv = Number(formValues.serv)
                newIngr.servOz = GtoOZ * Number(formValues.serv)
            }
        }

        var ingrAmm: number = 0
        if (Number.isNaN(formValues.ingrPortion)) {

            if (formValues.ingrPortion == '') {

                if (Number.isNaN(formValues.ingrPortionOz)) {

                    if (formValues.ingrPortionOz == '') {
                        //Both blank
                        //Need to fill one 

                    } else {
                        //Nan error
                    }

                } else {
                    //grams is blank but OZ is number
                    ingrAmm = Number(formValues.ingrPortion)
                }


            } else {
                //Nan error
            }
        } else {
            //grams is number
            ingrAmm = Number(formValues.ingrPortion)
        }

        if (newIngr.serv != 0 && ingrAmm != 0) {
            var newMealIngr: MealIngr = new MealIngr(newIngr, ingrAmm)
            var updateMeal: Meal = new Meal('', []);

            if (newMeal) {
                updateMeal.ingredientList = getIngredientList();
                updateMeal.name = getMealName();

                if (newMeal.ingredientList.length > 0) {
                    //If meal already has ingredients, add to existing list
                    updateMeal.ingredientList.push(newMealIngr)

                } else {
                    //If meal has no ingredients, create new list
                    updateMeal.ingredientList = [newMealIngr]
                }


                setNewMeal(updateMeal)
            } else {
                updateMeal.ingredientList.push(newMealIngr);

                setNewMeal(updateMeal)
            }
        }

        //if no errors 
        //TODO
        /*
                if (!errorCheck) {
                    if(newIngr.serv){
        
                    }
                    var newItem: MealIngr = { ingr: newIngr, servings: newIngr.serv }
                    if (ingrs) {
                        setIngrs(ingrs => [...ingrs!, newItem])
                    } else {
                        setIngrs([newItem])
                    }
        
        
                }
                    */
        e.preventDefault()


        /*
        newIngr = {name: addName,
            cal: number,
            p: number,
            c: number,
            f: number,
            serv: number,
            servOz: number,}
            */
    }

    const clearIngrForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        //Clear form values
        clearFormValues()
        //Clear form errors
        clearFormErrors()
        e.preventDefault()
    }

    const submitMeal = (e: any) => {
        if (newMeal.name != '' && newMeal.ingredientList.length > 0) {

            return onSubmit(newMeal)
        } else {
            if (newMeal.name == '') {
                //TODO name cant be empty
            }
            if (newMeal.ingredientList.length == 0) {
                //TODO meal must have ingredients
            }
            return false
        }


    }

    const cancelAddMeal = (e: any) => {
        onCancel(e);
    }




    //UseEffects
    useEffect(() => {
        //console.log(formError)
    }, [formError]);
    useEffect(() => {
        //console.log(formValues)
    }, [formValues]);
    return (
        <MainWrapper>

            {
                //Right third   
            }
            <SearchWrapper>
                <DivRow>
                    Search Ingredients
                </DivRow>
                <DivRow>
                    <SearchInput>

                    </SearchInput>
                </DivRow>

            </SearchWrapper>

            {
                //Middle third   
            }
            <IngredientWrapper>
                <form className={'ingrForm'} onSubmit={() => { return false; }}>
                    <DivRow>



                        <StyledInput size={formValues.ingrName.length || 15}
                            type="text"
                            id="name"
                            placeholder='Ingredient Name'
                            value={formValues.ingrName}
                            onChange={(e) => setFormValues({ ...formValues, ingrName: e.target.value })}
                            required>
                        </StyledInput>

                    </DivRow>
                    <DivRow>
                        <StyledError>
                            {formError.ingrName}
                        </StyledError>
                    </DivRow>

                    {
                        // Carbs field
                    }
                    <DivRow>
                        <StyledLabel className='ingrFormLabel'>
                            Carbs
                        </StyledLabel>
                        <StyledInput size={formValues.c.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
                            value={formValues.c}
                            onChange={(e) => setFormValues({ ...formValues, c: e.target.value })}
                        >
                        </StyledInput>
                        <UnitLabel className='unitLabel'>
                            g
                        </UnitLabel>
                    </DivRow>

                    {
                        //fat field 
                    }
                    <DivRow>
                        <StyledLabel className='ingrFormLabel'>
                            Fat
                        </StyledLabel>
                        <StyledInput size={formValues.f.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
                            value={formValues.f}
                            onChange={(e) => setFormValues({ ...formValues, f: e.target.value })}
                        >
                        </StyledInput>
                        <UnitLabel className='unitLabel'>
                            g
                        </UnitLabel>
                    </DivRow>

                    {
                        //Protein field 
                    }
                    <DivRow>
                        <StyledLabel className='ingrFormLabel'>
                            Protein
                        </StyledLabel >
                        <StyledInput size={formValues.p.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
                            value={formValues.p}
                            onChange={(e) => setFormValues({ ...formValues, p: e.target.value })}
                            required>
                        </StyledInput>
                        <UnitDropdown>
                            <option value='g'>g</option>
                            <option value='oz'>oz</option>
                        </UnitDropdown>
                    </DivRow>


                    {
                        // Serving field
                    }
                    <DivRow>
                        <StyledLabel className='ingrFormLabel' >
                            Serving Size
                        </StyledLabel>

                        <StyledInput className='serv' size={formValues.serv.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
                            value={formValues.serv}
                            onChange={(e) => setFormValues({ ...formValues, serv: e.target.value })}
                        >
                        </StyledInput>

                        <UnitDropdown onChange={(e) => { }}>
                            <option value='g'>g</option>
                            <option value='oz'>oz</option>
                        </UnitDropdown>


                    </DivRow>
                    <DivRow>
                        <StyledLabel className='ingrFormCalLabel'>
                            Calories
                        </StyledLabel>
                        <StyledInput size={formValues.cal.length || 1}
                            type="text"
                            id="Calories"
                            placeholder=''
                            value={formValues.cal}
                            onChange={(e) => setFormValues({ ...formValues, cal: e.target.value })}
                        >
                        </StyledInput>
                    </DivRow>
                    
                        <div>
                            <DivRow>
                                <StyledLabel className='serv'> Amount  </StyledLabel>
                                <StyledInput className='serv' size={formValues.ingrPortion.length || 1}
                                    type="text"
                                    id="name"
                                    placeholder=''
                                    value={formValues.ingrPortion}
                                    onChange={(e) => setFormValues({ ...formValues, ingrPortion: e.target.value })}
                                >
                                </StyledInput>
                                <UnitDropdown onChange={(e) => { }}>
                                    <option value='g'>g</option>
                                    <option value='oz'>oz</option>
                                </UnitDropdown>
                            </DivRow>
                            <OperationButton type='submit' onClick={submitAddIngr}>
                                Add
                            </OperationButton>
                            <OperationButton>
                                Save
                            </OperationButton>
                            <OperationButton onClick={clearIngrForm}>
                                Clear
                            </OperationButton>

                        </div>
                      



                            
                    

                </form>

            </IngredientWrapper>

            {
                //Left third   
            }
            <MealWrapper>
                <DivRow>
                    <DivRow>
                        <StyledInput
                            style={{
                                fontSize: '15px',

                            }}
                        //size={newMeal.name == '' ? 9 : newMeal.name.length }

                        //type="text"
                        //id="MealName"
                        //placeholder='Meal Name'
                        //value={formValues.ingrName}
                        //onChange={(e) => getFontSize(e.target.value )}
                        >
                            
                        </StyledInput>
                    </DivRow>
                    <DivRow>

                    </DivRow>
                    <DivRow>
                        <StyledLabel>
                            Totals:
                        </StyledLabel>

                    </DivRow>
                </DivRow>
                <DivRow>

                    {/* TODO
             * List ingredients here, with an edit and remove button next to each
             * Add field to edit ammount of ingr
             

                            
*/
                        newMeal.ingredientList?.map((item, index) => (

                            <MealIngrItem key={index}>
                                <MealIngrButtonWrapper>


                                    <MealIngrButton > </MealIngrButton>
                                    <MealIngrButton > </MealIngrButton>
                                </MealIngrButtonWrapper>
                                <div>
                                    <div>
                                        <StyledLabel style={{
                                            fontSize: '20px'
                                        }}>
                                            {item.amm}g of {item.ingr.name}
                                        </StyledLabel>
                                    </div>
                                    <div>
                                        <StyledLabel style={{
                                            fontSize: '20px'
                                        }}>
                                            {item.ingr.p}g P {item.ingr.cal} cals
                                        </StyledLabel>
                                    </div>
                                </div>
                            </MealIngrItem>

                        ))
                    }

                </DivRow>

            </MealWrapper>

            {

                //TODO search ingredients
            }
            <OperationButton onClick={submitMeal}>
                Submit
            </OperationButton>
            <OperationButton onClick={cancelAddMeal}>
                Cancel
            </OperationButton>

        </MainWrapper>
    )
}

export default MealEntry;

const DivRow = styled.div`
    
    display: block;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2px;
  
`
const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    float: right;
    width: 33%;
    height: 70%;
    align-items: strech;
`
const IngredientWrapper = styled.div`
    display: flex;
    float: right;
    width: 33%;
    height: 70%;
`

const MealIngrItem = styled.div`
    display: flex; 
    flex-direction: row;
    margin: 0;
    padding: 0;`

const MealIngrButton = styled.button`
    width: 1vw;
    height: 1vh;
    padding: 2vh 0 2vh 0;
    `

const MealWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    height: 70%;
`

const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
`
const MealIngrButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    `





const SearchInput = styled.input`

    border-radius: 2px;

`

const UnitLabel = styled.label`
font-size: 25px;
padding: 0 1px 0 1px; 
`
const UnitDropdown = styled.select`
size: 4vw;
padding: 0 1px 0 1px; 
`

const StyledError = styled.span`

`