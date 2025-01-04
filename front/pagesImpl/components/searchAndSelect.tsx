import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, Component, DetailedHTMLProps, useEffect } from 'react';
import { useState } from 'react';
import ProspectList from './prospectList';


interface ClickedMealProps {


  name: string,
  carbs: string,
  fat: string,
  protein: string,
  onClick: (e: any, index: number, newCarbs: string,
    newFat: string, newProtein: string, newPortion: string) => boolean,
  deleteClick: (e: any, index: number) => boolean,
  eatClick: (e: any, index: number, serving: number) => boolean,
  index: number,
  portion: string
}
interface MealProps {

  name: string,
  onClick: (index: number) => void,
  index: number
}
interface Meal {


  name: string,
  carbs: number,
  fat: number,
  protein: number,
  isClicked: boolean,
  portion: number,
}

export default function Home() {
  var first = { name: 'chili', carbs: 1, fat: 2, protein: 3, isClicked: false, portion: 1 };
  var second = { name: 'chicken', carbs: 3, fat: 2, protein: 1, isClicked: false, portion: 1 };

  const [addName, setAddName] = useState('');
  const [addCarbs, setAddCarbs] = useState('');
  const [addFat, setAddFat] = useState('');
  const [addProtein, setAddProtein] = useState('');
  const [addPortion, setAddPortion] = useState('');
  const [addPortionOZ, setAddPortionOZ] = useState('');




  const [meals, setMeals] = useState<Array<Meal>>([first, second]);
  const [clickedMeal, setClickedMeal] = useState(-1);
  const [addMealClicked, setAddMealClicked] = useState(false);

  const [eatenCalories, setEatenCalories] = useState(0);
  const [eatenProtein, setEatenProtein] = useState(0);
  const clickMeal = (index: number) => {
    var newMeals = meals

    newMeals[index].isClicked = true
    if (clickedMeal >= 0)
      newMeals[clickedMeal].isClicked = false

    setMeals([...newMeals])
    setClickedMeal(index)

    console.log(meals[index].isClicked)
  };

  const deleteMeal = (e: any, index: number) => {
    var newMeals = [...meals]
    newMeals.splice(index, 1)

    setMeals(newMeals)
    setClickedMeal(-1)
    return true
  };

  const eatMeal = (e: any, index: number, serving: number) => {
    //TODO display serving of meal in left side and update calories and protein for day
    return true
  };

  /*
  useEffect(() => { 
    
   }, [meals])
   */
  const submitAddMeal = (e: any) => {
    e.preventDefault()
    if (Number.isNaN(addCarbs)
    ) {
      //error message: field validation
      console.log('Carbs is not valid number')
      return false
    }
    else if (Number.isNaN(addFat)
    ) {
      //error message: field validation
      console.log('Fat is not valid number')
      return false

    }
    else if (Number.isNaN(addProtein)
    ) {

      //error message: field validation
      console.log('Protein is not valid number')
      return false

    } else if (Number.isNaN(addPortion)
    ) {

      //error message: field validation
      console.log('Portion is not valid number')
      return false
    } else {
      var newMeal = {
        name: addName, carbs: Number(addCarbs),
        fat: Number(addFat), protein: Number(addProtein),
        portion: Number(addPortion), isClicked: false
      }
      var newMeals = meals
      newMeals.push(newMeal)
      setMeals([...newMeals])
      setAddCarbs("0")
      setAddFat("0")
      setAddProtein("0")
      setAddPortion("0")
      setAddPortionOZ("0")
      setAddMealClicked(false)
    }

  };
  const cancelAddMeal = () => {
    setAddMealClicked(false)
  };
  const addMeal = () => {
    setAddMealClicked(true)
  };
  const editMeal = (e: any, whichMeal: number, newCarbs: string,
    newFat: string, newProtein: string, newPortion: string
  ) => {
    e.preventDefault()
    if (Number.isNaN(newCarbs)
    ) {
      //error message: field validation
      console.log('Carbs is not valid number')
      return false
    }
    else if (Number.isNaN(newFat)
    ) {
      //error message: field validation
      console.log('Fat is not valid number')
      return false

    }
    else if (Number.isNaN(newProtein)
    ) {

      //error message: field validation
      console.log('Protein is not valid number')
      return false

    } else {

      var newMeals = meals
      newMeals[whichMeal].carbs = Number(newCarbs)
      newMeals[whichMeal].fat = Number(newFat)
      newMeals[whichMeal].protein = Number(newProtein)
      newMeals[whichMeal].portion = Number(newPortion)
      setMeals([...newMeals])
      console.log("editClick")
      return true
    }
  };

  return <>
    
      <DivRow>
        <h1 style={
          {
            padding: '5px'
          }
        }>Meals</h1>

        {addMealClicked ?
          <form onSubmit={() => { return false; }}>
            <DivRow>
              <StyledLabel >
                Name
              </StyledLabel>
              <StyledInput size={addName.length || 1}
                type="text"
                id="name"
                placeholder=''
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                required>
              </StyledInput>

            </DivRow>
            <DivRow>
              <StyledLabel>
                Carbs
              </StyledLabel>
              <StyledInput size={addCarbs.length || 1}
                type="text"
                id="name"
                placeholder=''
                value={addCarbs}
                onChange={(e) => setAddCarbs(e.target.value)}
                required>
              </StyledInput>
              <label>
                g
              </label>
            </DivRow>
            <DivRow>
              <StyledLabel >
                Fat
              </StyledLabel>
              <StyledInput size={addFat.length || 1}
                type="text"
                id="name"
                placeholder=''
                value={addFat}
                onChange={(e) => setAddFat(e.target.value)}
                required>
              </StyledInput>
              <label>
                g
              </label>
            </DivRow>
            <DivRow>
              <StyledLabel >
                Protein
              </StyledLabel>
              <StyledInput size={addProtein.length || 1}
                type="text"
                id="name"
                placeholder=''
                value={addProtein}
                onChange={(e) => setAddProtein(e.target.value)}
                required>
              </StyledInput>
              <label>
                g
              </label>
            </DivRow>
            <DivRow>

              <StyledInput size={addPortion.length || 1}
                type="text"
                id="name"
                placeholder=''
                value={addPortion}
                onChange={(e) => setAddPortion(e.target.value)}
                required>
              </StyledInput>
              <label>
                g
              </label>
              <StyledInput size={addPortionOZ.length || 1}
                type="text"
                id="name"
                placeholder=''
                value={addPortionOZ}
                onChange={(e) => setAddPortionOZ(e.target.value)}
                required>
              </StyledInput>
              <label>
                oz
              </label>
            </DivRow>

            <OperationButton onClick={submitAddMeal}>
              Submit
            </OperationButton>
            <OperationButton onClick={cancelAddMeal}>
              Cancel
            </OperationButton>
          </form>

          :

          <AddMealButton onClick={addMeal}>
            Add Meal
          </AddMealButton>
        }
      </DivRow>

     <ProspectList/>

  </>
}


// divs
const MainDiv = styled.div`

height: 100vh;
width: 100vw;
background: #1a1717;
background-size: auto;

`
const LeftSide = styled.div`

height: auto ;
width: 44vw;
margin: 2vw;
padding: 1vh;
background: #6e13b0;
background-size: auto;
float:left;
border-radius: 50px


`
const RightSide = styled.div`

height: auto;
width: 44vw;
margin: 2vw;
padding: 1vh;
background: #6e13b0;
background-size: auto;
float:right;
border-radius: 50px

`

const DivTable = styled.div`

 width: 100%; 
 display: table;
  
`
const DivRow = styled.div`
    
display: flex;
  flex-direction: row;
 justify-content: center;
  align-items: center;
  
  padding: 2px;
  
`
const DivCell = styled.div`
  
  display: inline-block;
 padding: 5px;
  
`
const DivCellRight = styled.div`
  
  display: inline-block;
 padding: 5px;
 width: 15vw;
height: auto;
margin: 5vh;
  
`

const EditFormWrapper = styled.div`

padding-top: 3vh

`

const EatenMealWrapper = styled.div`

padding: 3vh

`

// buttons
const OperationButton = styled.button`
    
  
  width: fit-content;
 
  height: fit-content;
  background-color: #b1b3b5;
  border: none;
  margin: 2px;
  text-align: center;
  
  border-radius: 5px
  
  
`

const AddMealButton = styled.button`
width: 15vw;
height: 10vh;
margin: 5vh;
font-size: 25px;
background: #b1b3b5;
border: none;
border-radius: 5px
`
// form



const StyledLabel = styled.label`

height: 2vh;
width: fit-content;
margin: 2vw;
padding: 2px;

border-radius: 5px;
`


const StyledInput = styled.input`

margin: 2vw;
padding: 2px;

border-radius: 5px;
`

