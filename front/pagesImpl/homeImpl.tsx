import styled from '@emotion/styled'
import { useState } from 'react';

export default function Home() {

    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [protien, setProtien] = useState('');

    const submitMeal = () => {

    }
    return <MainDiv>
       <LeftSide>
        <h1>
           Time
        </h1>
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

       </RightSide>
    </MainDiv>
}

//divs
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
`
const RightSide = styled.div`

height: 80vh;
width: 75vw;
margin: 2vw;
padding: 1vh;
background: #6e13b0;
background-size: auto;
float:right;

`

const MealButton = styled.button`
background: #f5f7fa;
justify-content: center;
`
