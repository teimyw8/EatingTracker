import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, Component, DetailedHTMLProps, useEffect } from 'react';
import { useState } from 'react';
import CurrentDay from './components/currentDay';
import MealEntry from './components/mealEntry';
import { EatenEntry, Ingredient, Meal, MealIngr, Displayable, DisplayListType, OZtoG, GtoOZ } from './components/commonTypes';
//TODO 
//EAT MEAL
//EATEN TOTAL
export interface SearchDisplayListProps {
  items: Array<Displayable>;
  editClick: ( index: number, newMeal: Meal) => boolean,
  deleteClick: ( index: number) => boolean,
  eatClick: ( index: number, ammEaten: number) => boolean,

}



//prob rename this TODO
interface MealProps {

  name: string,
  onClick: (index: number) => void,
  index: number
}

interface DisplayListProps {

}

export default function Home() {


  const [addName, setAddName] = useState('');
  const [addCarbs, setAddCarbs] = useState('');
  const [addFat, setAddFat] = useState('');
  const [addProtein, setAddProtein] = useState('');
  const [addPortion, setAddPortion] = useState('');
  const [addPortionOZ, setAddPortionOZ] = useState('');

  const [eatenList, setEatenList] = useState<Array<EatenEntry>>();
  const [currentDay, setCurrentDay] = useState(new Date());
  const [updateCurrentDay,setUpdateCurrentDay] = useState(0)
  //const [update]

  const changeDay = (newDay: Date) => {
    console.log('in changeDay home old new ', currentDay, newDay)
    setCurrentDay(newDay)
    setUpdateCurrentDay((prev) => prev + 1)
    

  }

  const [mealDisplayList, setMealDisplayList] = useState<Array<Displayable>>()
  const [updateDisplayList,setUpdateDisplayList] = useState(0)

  const updateMealDisplayList = (newMeals: Array<Meal>) => {
    console.log(newMeals)
    var newDisplayList: Array<Displayable> = new Array();
    newMeals.forEach(element => {
      newDisplayList.push({ ingrList: element.ingredientList, type: DisplayListType.MEAL, name: element.name, isClicked: false })
    });
      
    setMealDisplayList(newDisplayList)
    setUpdateDisplayList((prev) => prev + 1)
    
   
  }


  var dummyIngr: Ingredient = { name: 'dummyIngr', serv: 2, servOz: undefined, c: undefined, f: undefined, cal: 100, p: 10 };
  var dummyMealIngr: MealIngr = new MealIngr(dummyIngr, 2)
  var first: Meal = new Meal(  'chili' , [dummyMealIngr]) ;
  var second: Meal = new Meal(  'cchicken',  [dummyMealIngr] );
  var firstMeal: Meal = new Meal(first.name, first.ingredientList)
  var secondMeal: Meal = new Meal(second.name, second.ingredientList)
  const [meals, setMeals] = useState<Array<Meal>>([firstMeal,secondMeal]);
  const [addMealClicked, setAddMealClicked] = useState(false);

  const [eatenCalories, setEatenCalories] = useState(0);
  const [eatenProtein, setEatenProtein] = useState(0);


  //Click functions
  const deleteMeal = ( index: number) => {
    if (meals) {
      var newMeals = [...meals]
      newMeals.splice(index, 1)

      setMeals(newMeals)
      return true
    }
    return false

  };

  const eatMeal = ( index: number, amEaten: number) => {
    //TODO display serving of meal in left side and update calories and protein for day
    
    if (meals) {
      console.log('In home eatMeal %d %d', index, amEaten, meals )
      var eatenMeal = meals[index]
      var servings = eatenMeal.servingSize() / amEaten
      var newEntry: EatenEntry = { name: eatenMeal.name, cal: eatenMeal.totalCal()*servings, p: eatenMeal.totalP()*servings, servings:servings, editClicked: false };
      newEntry.name = eatenMeal.name;
      if (eatenList) {
        console.log('In home eatMeal eatenList exitst')
        setEatenList([...eatenList, newEntry])
        
      } else {
        setEatenList([newEntry])
        console.log(newEntry )
        console.log('In home eatMeal no eaten list' )
      }
      setUpdateCurrentDay((prev) => prev + 1)
      return true
    }

    return false;


  };
  const submitAddMeal = ( newMeal: Meal) => {

    if (meals) {
      //console.log(meals)
      setMeals([...meals, newMeal])
    } else {
      setMeals([newMeal])
    }    

    setAddMealClicked(false)

    return true;
  };

  const cancelAddMeal = (e:any) => {
    e.preventDefault();
    setAddMealClicked(false)
    return true;
  };

  const addMeal = () => {
    setAddMealClicked(true)
  };

  const editMeal = ( index: number, newMeal: Meal
  ) => {
    
    if (meals) {
      var newMeals = meals
      newMeals[index] = newMeal
      setMeals([...newMeals])
      console.log("editSubmit")
      return true
    }
    return false

  };

// Use Effect
  useEffect(() => {
    
    if (meals == undefined) {
      
      //etMeals([firstMeal, secondMeal])

    }
  }, [])

  useEffect(() => {
    if (meals) {
      //console.log(meals)
      updateMealDisplayList(meals)
    }

  }, [meals])

  useEffect(() => {
    // TODO Call DB to see if theres record for new day

  }, [currentDay,eatenList])



  return <MainDiv>
    <LeftSide>
        <div className='container'>
          <CurrentDay key={updateCurrentDay} date={currentDay} eaten={eatenList} changeDay={changeDay} />
        </div>

    </LeftSide>

    <RightSide>
      <DivRow>


        {addMealClicked ?
          <MealEntry onCancel={cancelAddMeal} onSubmit={submitAddMeal}>

          </MealEntry>

          :

          <DivTable>
            <StyledHeading>Meals</StyledHeading>
            <AddMealButton onClick={addMeal}>
              Add Meal
            </AddMealButton>
          </DivTable>

        }
      </DivRow>
      {mealDisplayList ?
        <SearchDisplayList key={updateDisplayList} items={mealDisplayList} editClick={editMeal} eatClick={eatMeal} deleteClick={deleteMeal}>

        </SearchDisplayList>
        :
        <DivTable>
        </DivTable >
      }



    </RightSide>
  </MainDiv>
}
//Classes

const SearchDisplayList: React.FC<SearchDisplayListProps> = ({ items, deleteClick, eatClick, editClick }) => {
  const [displayList, setDisplayList] = useState(items)

  const [clickedMeal, setClickedMeal] = useState(-1);
  const clickMeal = (index: number) => {
    if (displayList) {
      var newMeals = displayList

      newMeals[index].isClicked = true
      if (clickedMeal >= 0)
        newMeals[clickedMeal].isClicked = false

      setDisplayList([...newMeals])
      setClickedMeal(index)
    }

  };

  return (
    <>
      {displayList.map((item, index) => (
        item.isClicked ?
          <ClickedMeal key={index} editClick={editClick} deleteClick={deleteClick} eatClick={eatClick} meal={new Meal(item.name, item.ingrList)} index={index}></ClickedMeal>
          :
          <UnclickedMeal key={index} onClick={clickMeal} name={item.name} index={index}></UnclickedMeal>
      ))}
    </>
  )

}

const ClickedMeal: React.FC<ClickedMealProps> = ({ editClick, eatClick, deleteClick, meal, index,  }) => {
  const [nameDisplay, setNameDisplay] = useState(String(meal.name));
  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [eatError, setEatError] = useState(false)


  const [eatClicked, setEatClicked] = useState(false)

  const [eatPortion, setEatPortion] = useState('');
  const [eatPortionOZ, setEatPortionOZ] = useState('');
  const [eatMeal, setEatMeal] = useState<Meal>();

  const clickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditClicked(true)
    setEatClicked(false)
  }
  const clickCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditClicked(false)
  }
  const submitMeal = () => {

  }

  const setEatClickF = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEatClicked(false)
  }
  const setEatClickT = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEatClicked(true)
    setEditClicked(false)
  }

  //TODO
  //Validate serving is number and check which unit is being used
  //If serving not number show message
  const eatSubmit = (e: any, index: number, serving: string, servingOZ: string) => {
    //TODO need to pass eaten ammount to EatenEntry creation
    eatClick( index, Number(serving))
    setEatClicked(false)
    var amountEaten;
    if (serving) {
      if (Number.isNaN(serving)) {
        //TODO eat submit form err  ors
        return false
      } else {
        amountEaten = Number(serving)
      }

    } else {     
        if (Number.isNaN(servingOZ)) {
          return false
        } else {
          amountEaten = Number(servingOZ) * OZtoG
        }

    }
    
    if (amountEaten){
      eatClick(index, amountEaten);
      return true;
    }  

    return false;
   
  }

  const editSubmit = (e: any, index: number, newMeal: Meal
  ) => {
    setEditClicked(false)
    editClick(index, newMeal)
  }

  // const [carbsDisplay, setCarbs] = useState(carbs.toString);


  return (



    <div>
      <DivTable>

        <DivRow>


          <DivCell>
            <h2>{nameDisplay}</h2>
          </DivCell>


          <DivCell>
            <OperationButton onClick={setEatClickT}>Eat</OperationButton>
            <div></div>
            <OperationButton onClick={clickEdit}>Edit</OperationButton>
            <div></div>
            <OperationButton onClick={(e: any) => {
              deleteClick(index);
              e.preventDefault()
            }}>
             Delete</OperationButton>
          </DivCell>

          <DivCellRight>
            <EditFormWrapper>
              {editClicked ?

                <div>
                  TODO
                  <button onClick={(e: any) => {
                    setEditClicked(false)
                    e.preventDefault()
                  }}>
                    cancel
                  </button>
                </div>


                :
                eatClicked
                  ?
                  <DivCell>
                    <form>

                      <StyledInput size={eatPortion.length || 1}
                        type="text"
                        id="name"
                        placeholder=''
                        value={eatPortion}
                        onChange={(e) => setEatPortion(e.target.value)}
                        required>
                      </StyledInput>
                      <label>
                        g
                      </label>
                      <StyledInput size={eatPortion.length || 1}
                        type="text"
                        id="name"
                        placeholder=''
                        value={eatPortionOZ}
                        onChange={(e) => setEatPortionOZ(e.target.value)}
                        required>
                      </StyledInput>
                      <label>
                        oz
                      </label>
                    </form>
                    <OperationButton onClick={(e: any) => eatSubmit(e, index, eatPortion, eatPortionOZ)}>Submit</OperationButton>
                    <OperationButton onClick={setEatClickF} >Cancel</OperationButton>
                    {eatError
                      ? <div>
                        Serving should be only numbers
                      </div>
                      :
                      <div>

                      </div>}
                  </DivCell>

                  :
                  <div>

                  </div>
              }
            </EditFormWrapper>
          </DivCellRight>
        </DivRow>
      </DivTable>
    </div>










  );
};

const UnclickedMeal: React.FC<MealProps> = ({ onClick, name, index }) => {
  const [nameDisplay, setNameDisplay] = useState(String(name));
  //const [carbsDisplay, setCarbs] = useState(carbs.toString);


  return (

    <DivRow >


      <h2 onClick={() => onClick(index)}>{nameDisplay}</h2>
      <DivCellRight></DivCellRight>






    </DivRow>
  );
};


// divs
const MainDiv = styled.div`

height: 100vh;
width: 100vw;
background: #1a1717;
background-size: auto;

`
const LeftSide = styled.div`

height: auto;
min-height: 40vh;
width: 34vw;
margin: 2vw;
padding: 1vh;
background: #6e13b0;
background-size: auto;
float:left;
clip-path: polygon(3% 0, 97% 0%, 100% 10%, 100% 90%, 97% 100%, 3% 100%, 0 90%, 0 10%);
border-radius: 40px;


`
const RightSide = styled.div`

height: auto;
width: 54vw;
margin: 2vw;
padding: 1vh;
background: #6e13b0;
background-size: auto;
float:right;
border-radius: 40px;

`
//clip-path: polygon(2% 0, 98% 0, 100% 20%, 100% 80%, 98% 100%, 2% 100%, 0 80%, 0 20%);

const DivTable = styled.div`

 width: 100%; 
 display: table;

  
`
const DivRow = styled.div`
    
display: flex;
  flex-direction: row;
justify-content: start;
  align-items: center;
  
  padding: 2px;
  margin: 0 0 0 2vw;
  
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



export const StyledInput = styled.input`

margin: 1vw;
padding: 2px;

border-radius: 5px;
`

const StyledHeading = styled.label`
font-size: 30px;
  font-weight: bold;

`
