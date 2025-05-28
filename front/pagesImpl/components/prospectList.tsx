import styled from '@emotion/styled';
import React, { useState } from 'react'

const ProspectList = (): React.JSX.Element => {
    //TODO ALL
    //Pass meals in as props
    //Pass edit click 
    //Pass delete click 
    //Pass eatClick
    //Do clickedMeal handling here
    return (
        <>
            {meals.map((item, index) => (
                item.isClicked ?
                    <ClickedMeal key={index} onClick={editMeal} deleteClick={deleteMeal} eatClick={eatMeal} name={item.name} carbs={String(item.carbs)} fat={String(item.fat)} protein={String(item.protein)} portion={String(item.portion)} index={index}></ClickedMeal>
                    :
                    <UnclickedMeal key={index} onClick={clickMeal} name={item.name} index={index}></UnclickedMeal>
            ))}

        </>
    )
}

//Classes

const ClickedMeal: React.FC<ClickedMealProps> = ({ onClick, eatClick, deleteClick, carbs, fat, protein, name, index, portion }) => {
    const [nameDisplay, setNameDisplay] = useState(String(name));
    const [editClick, setEditClick] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [eatError, setEatError] = useState(false)

    const [editCarbs, setCarbs] = useState(String(carbs));
    const [editFat, setFat] = useState(String(fat));
    const [editProtein, setProtein] = useState(String(protein));
    const [editPortion, setPortion] = useState(String(portion));
    const [editPortionOZ, setPortionOZ] = useState(String(Number(portion) * 30));
    const [eatClicked, setEatClicked] = useState(false)

    const [eatPortion, setEatPortion] = useState('');
    const [eatPortionOZ, setEatPortionOZ] = useState('');
    const [eatMeal, setEatMeal] = useState<Meal>();

    const clickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEditClick(true)
        setEatClicked(false)
    }
    const clickCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEditClick(false)
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
        setEditClick(false)
    }

    //TODO
    //Validate serving is number and check which unit is being used
    //If serving not number show message
    const eatSubmit = (e: any, index: number, serving: string, servingOZ: string) => {
        setEatClicked(false)
        var numberval = false;
        if (serving) {
            if (Number.isNaN(serving)) {

            }
        } else if (servingOZ) {
            if (Number.isNaN(servingOZ)) {

            }

        }
        eatClick(e, index, Number(serving))
    }

    const editSubmit = (e: any, whichMeal: number, newCarbs: string,
        newFat: string, newProtein: string, newPortion: string
    ) => {
        setEditClick(false)
        onClick(e, index, newCarbs, newFat, newProtein, newPortion)
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
                        <OperationButton onClick={(e: any) => deleteClick(e, index)} >Delete</OperationButton>
                    </DivCell>

                    <DivCellRight>
                        <EditFormWrapper>
                            {editClick ?
                                <form onSubmit={submitMeal}>
                                    <StyledLabel >
                                        Carbs:
                                    </StyledLabel>
                                    <StyledInput type="text"
                                        size={editCarbs.length || 1}
                                        id="carbs"
                                        placeholder='0'
                                        value={editCarbs}
                                        onChange={(e) => setCarbs(e.target.value)}
                                        required>
                                    </StyledInput>
                                    <div>
                                        <StyledLabel>
                                            Fat:
                                        </StyledLabel>

                                        <StyledInput type="text"
                                            size={editFat.length || 1}
                                            id="fat"
                                            placeholder='0'
                                            value={editFat}
                                            onChange={(e) => setFat(e.target.value)}
                                            required>
                                        </StyledInput>

                                    </div>

                                    <StyledLabel>
                                        Protein
                                    </StyledLabel>
                                    <StyledInput type="text"
                                        size={editProtein.length || 1}
                                        id="protein"
                                        placeholder='0'
                                        value={editProtein}
                                        onChange={(e) => setProtein(e.target.value)}
                                        required>
                                    </StyledInput>


                                    <StyledInput type="text"
                                        size={editPortion.length || 1}
                                        id="protein"
                                        placeholder='0'
                                        value={editPortion}
                                        onChange={(e) => setPortion(e.target.value)}
                                        required>
                                    </StyledInput>
                                    <StyledLabel>
                                        Portion in g
                                    </StyledLabel>

                                    <StyledInput type="text"
                                        size={editPortionOZ.length || 1}
                                        id="protein"
                                        placeholder='0'
                                        value={editPortionOZ}
                                        onChange={(e) => setPortionOZ(e.target.value)}
                                        required>
                                    </StyledInput>
                                    <StyledLabel>
                                        Portion in oz
                                    </StyledLabel>
                                    <div>
                                    </div>
                                    <DivRow>
                                        <OperationButton onClick={(e: any) => onClick(e, index, editCarbs, editFat, editProtein, editPortion)} type="submit">
                                            Submit
                                        </OperationButton>
                                        <OperationButton onClick={clickCancel}>
                                            Cancel
                                        </OperationButton>
                                    </DivRow>
                                </form>
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

const DivTable = styled.div`

    width: 100%; 
    display: table;
  
`
const DivRow = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    items: center;
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
export default ProspectList;