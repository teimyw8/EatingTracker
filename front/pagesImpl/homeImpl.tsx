import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, Component, DetailedHTMLProps, useEffect } from 'react';
import { useState } from 'react';

interface MealProps {


  name: string,
  carbs: number,
  fat: number,
  protein: number,
  onClick: (index: number ) => void ,
  index: number
}
interface Meal {


  name: string,
  carbs: number,
  fat: number,
  protein: number,
  isClicked: boolean,
}

export default function Home() {
  var first = {name: 'chili', carbs: 1, fat: 2, protein: 3, isClicked: false}
  var second = {name: 'chicken', carbs: 3, fat: 2, protein: 1, isClicked: false}
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protien, setProtien] = useState('');
  const [meals, setMeals] = useState<Array<Meal>>([first, second]); 

  const clickMeal = ( index: number) => {
    var newMeals = meals
    newMeals[index].isClicked = true
    setMeals([...newMeals])
    console.log(meals[index].isClicked)
  }
  /*
  useEffect(() => { 
    
   }, [meals])
   */
  const submitMeal = () => {

  }
  return <MainDiv>
    <LeftSide>
      <h1>
        Date
      </h1>
      <button>Select Date</button>
      <form onSubmit={submitMeal}>
        <label >
          Carbs
        </label>
        <input type="text"
          id="carbs"
          placeholder='0'
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          required>
        </input>
        <div>
          <label>
            Fat
          </label>

          <input type="text"
            id="fat"
            placeholder='0'
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            required>
          </input>
        </div>

        <label>
          Protien
        </label>
        <input type="text"
          id="protien"
          placeholder='0'
          value={protien}
          onChange={(e) => setProtien(e.target.value)}
          required>
        </input>
        <div>
        </div>
        <MealButton type="submit">
          Add meal
        </MealButton>
      </form>

    </LeftSide>

    <RightSide>
      <h1>Meals</h1>
      {meals.map((item, index) => (
        item.isClicked ? 
        <ClickedMeal key={index} onClick={clickMeal} name={item.name} carbs={item.carbs} fat={item.fat} protein={item.protein} index={index}></ClickedMeal>
        :
        <UnclickedMeal key={index} onClick={clickMeal} name={item.name} carbs={item.carbs} fat={item.fat} protein={item.protein} index={index}></UnclickedMeal>
      ) )}
        
     
    </RightSide>
  </MainDiv>
}
//Classes

const ClickedMeal: React.FC<MealProps> = ({ onClick, carbs, fat, protein, name, index }) => {
  const [nameDisplay, setNameDisplay] = useState(String(name));
  const [editClick, setEditClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);

  const [editCarbs, setCarbs] = useState(String(carbs));
  const [editFat, setFat] = useState(String(fat));
  const [editProtien, setProtien] = useState(String(protein));


  const clickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditClick(true)
  }
  const clickCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditClick(false)
  }
  const submitMeal = () => {
    
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
            <OperationButton onClick={clickEdit}>Edit</OperationButton>
            <div></div>

            <OperationButton>Delete</OperationButton>
          </DivCell>
          <DivCell>
            {editClick ?
            <form onSubmit={submitMeal}>
              <label >
                Carbs
              </label>
              <input type="text"
                id="carbs"
                placeholder='0'
                value={editCarbs}
                onChange={(e) => setCarbs(e.target.value)}
                required>
              </input>
              <div>
                <label>
                  Fat
                </label>

                <input type="text"
                  id="fat"
                  placeholder='0'
                  value={editFat}
                  onChange={(e) => setFat(e.target.value)}
                  required>
                </input>
              </div>

              <label>
                Protien
              </label>
              <input type="text"
                id="protien"
                placeholder='0'
                value={editProtien}
                onChange={(e) => setProtien(e.target.value)}
                required>
              </input>
              <div>
              </div>
              <MealButton type="submit">
                Submit
              </MealButton>
              <MealButton onClick={clickCancel}>
                Cancel
              </MealButton>
            </form>
            : 
            <div>

            </div>
}
          </DivCell>
        </DivRow>
      </DivTable>
    </div>










  );
};

const UnclickedMeal: React.FC<MealProps> = ({onClick, carbs, fat, protein, name, index }) => {
  const [nameDisplay, setNameDisplay] = useState(String(name));
  //const [carbsDisplay, setCarbs] = useState(carbs.toString);


  return (

    <div >


      <h2 onClick={() => onClick( index )}>{index}{nameDisplay}</h2>







    </div>
  );
};
//divs
const OperationButton = styled.button`
    
  
  width: 50px;
 
  height: 20px;
  background-color: #b1b3b5;
  border: none;
  margin: 2px;
  text-align: center;
  
  
  
  
`
const DivRow = styled.div`
    
  display: table-row;
  
  
  padding: 10px;
  
`
const DivTable = styled.div`

 width: 100%; 
 display: table;
  
`
const DivCell = styled.div`

  display: inline-block;
 padding: 5px;
  
`
const MainDiv = styled.div`

height: 100vh;
width: 100vw;
background: #1a1717;
background-size: auto;

`
const LeftSide = styled.div`

height: 80vh;
width: 13vw;
margin: 2vw;
padding: 1vh;
background: #6e13b0;
background-size: auto;
float:left;
border-radius: 50px


`
const RightSide = styled.div`

height: 80vh;
width: 75vw;
margin: 2vw;
padding: 1vh;
background: #6e13b0;
background-size: auto;
float:right;
border-radius: 50px

`

const MealButton = styled.button`
background: #f5f7fa;
justify-content: center;
`
