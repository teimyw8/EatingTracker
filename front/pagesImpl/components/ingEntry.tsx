import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
    MealIngr, Ingredient, Meal, OZtoG,
    GtoOZ,
    Fcal,
    Ccal
} from './commonTypes'

interface errorEntry {
    type: string
    msg: string
}



interface IngEntryProp {
    onSubmit: (e: any, meal: Meal) =>  boolean;
    onCancel: (e: any) => boolean;

}
const IngEntry = ({onSubmit, onCancel}: IngEntryProp): React.JSX.Element => {
    //TODO maybe use map or some other strucutre for both form values and errors
    //Form values
    const [formValues, setFormValues] = useState(
        {
            ingrName: '',
            c: '',
            f: '',
            p: '',
            cal: '',
            serv: '',
            servOz: '',
            mealName: '',
        })

    const clearFormValues = () => {
        setFormValues({
            c: '',
            f: '',
            p: '',
            cal: '',
            serv: '',
            servOz: '',
            ingrName: '',
            mealName: ''
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
    const [mealIngrs, setIngrs] = useState<Array<MealIngr>>()




    // Button click functions
    const addIngr = (e: React.MouseEvent<HTMLButtonElement>) => {
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

        if(newIngr.serv !=0 ){
            if(mealIngrs){
                setIngrs([...mealIngrs, {}])
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

    const clearForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        //Clear form values
        clearFormValues()
        //Clear form errors
        clearFormErrors()
        console.log('clear end')
        console.log(formValues)
        e.preventDefault()
    }

    const submitMeal = (e: any) => {

        return onSubmit(e)
        
    }

    const cancelAddMeal = (e: any) => {
        onCancel(e);
    }


    //UseEffects
    useEffect(() => {
        console.log(formError)
    }, [formError]);
    useEffect(() => {
        console.log(formValues)
    }, [formValues]);
    return (
        <MainWrapper>
            <SearchWrapper>
                <DivRow>
                    Search Ingredients
                </DivRow>
                <DivRow>
                <SearchInput>

                </SearchInput>
                </DivRow>
                
            </SearchWrapper>
            <IngredientWrapper>
                <form className={'ingrForm'} onSubmit={() => { return false; }}>
                    <DivRow>
                        <StyledLabel >
                            Name
                        </StyledLabel>
                        <StyledInput size={formValues.ingrName.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
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
                    <DivRow>
                        <StyledLabel>
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
                        <label className='unitLabel'>
                            g
                        </label>
                    </DivRow>
                    <DivRow>
                        <StyledError>
                            {formError.ingrName}
                        </StyledError>
                    </DivRow>
                    <DivRow>
                        <StyledLabel >
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
                        <label className='unitLabel'>
                            g
                        </label>
                    </DivRow>
                    <DivRow>
                        <StyledLabel >
                            Protein
                        </StyledLabel>
                        <StyledInput size={formValues.p.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
                            value={formValues.p}
                            onChange={(e) => setFormValues({ ...formValues, p: e.target.value })}
                            required>
                        </StyledInput>
                        <label className='unitLabel'>
                            g
                        </label>
                    </DivRow>
                    {//add cal field
                    }
                    <DivRow>
                        <label className='serv'>Serving Size  </label>
                        <StyledInput className='serv' size={formValues.serv.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
                            value={formValues.serv}
                            onChange={(e) => setFormValues({ ...formValues, serv: e.target.value })}
                        >
                        </StyledInput>

                        <label className='unitLabel'>
                            g
                        </label>
                        <StyledInput size={formValues.servOz.length || 1}
                            type="text"
                            id="name"
                            placeholder=''
                            value={formValues.servOz}
                            onChange={(e) => setFormValues({ ...formValues, servOz: e.target.value })}
                        >
                        </StyledInput>
                        <label className='unitLabel'>
                            oz
                        </label>
                    </DivRow>
                    <DivRow>
                        <OperationButton type='submit' onClick={addIngr}>
                            Add
                        </OperationButton>
                        {
                            //Add clear functionality
                        }

                        <OperationButton onClick={clearForm}>
                            Clear
                        </OperationButton>
                        {
                            //Add Save functionality
                        }
                        <OperationButton>
                            Save
                        </OperationButton>
                    </DivRow>
                </form>

            </IngredientWrapper>
            <MealWrapper>
                <DivRow>
                    <span>Meal Name</span>
                    <StyledInput></StyledInput>
                </DivRow>
                <DivRow>
                    <ul>
                        {/* TODO
             * List ingredients here, with an edit and remove button next to each
             * Add field to edit ammount of ingr
             

                            ingrs?.map((item, index) => (

                               <li key={index}>{item.ingr.name} {item.amm}</li>

                            ))
*/
                        }
                    </ul>
                </DivRow>

            </MealWrapper>
            
            {
                //TODO submit and cancel functionity
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

export default IngEntry;

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

const OperationButton = styled.button`
    
  
  width: fit-content;
  height: fit-content;
  background-color: #b1b3b5;
  border: none;
  margin: 2px;
  text-align: center;
  
  border-radius: 5px
  
`

const StyledInput = styled.input`

    margin: 1%;
    padding: 1%;
    border-radius: 5px;
    flex: 1;
`

const SearchInput = styled.input`

    border-radius: 2px;

`
/*
    float: right;
    */
const StyledLabel = styled.label`

    height: 2vh;
    width: fit-content;
    margin: 1vw;
    padding: 1px; 
    border-radius: 5px;
`

const StyledError = styled.span`

`