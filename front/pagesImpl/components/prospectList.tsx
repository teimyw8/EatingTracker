import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { DisplayableItem, Meal, Measurement, MeasuringUnitType, OperationButton, StyledInput, StyledLabel } from './commonTypes'
import { useDispatch } from 'react-redux';
import { click } from '../../redux/slices/prospectListSlice';


interface ProspectListProps {
    onEdit: (index: number, newMeal: Meal) => boolean;
    onEat: (index: number, amm: number) => boolean;
    onDelete: (index: number) => boolean;
    listToDisplay: Array<DisplayableItem>;

}

interface ClickedMealProps {

    displayItem: DisplayableItem,
    editClick: (index: number, newMeal: Meal) => boolean,
    deleteClick: (index: number) => boolean,
    eatClick: (index: number, ammEaten: number) => boolean,
    index: number,

}

interface UnclickedMealProps {
    item: DisplayableItem,
    onClick: (index: number) => boolean,
    index: number,

}

const ProspectList = ({ listToDisplay, onEdit, onEat, onDelete }: ProspectListProps): React.JSX.Element => {
    //TODO ALL
    //Pass meals in as props
    //Pass edit click 
    //Pass delete click 
    //Pass eatClick
    //Do clickedMeal handling here

    const [displayList, setDisplayList] = useState(listToDisplay)

    const dispatch = useDispatch();

    const [clickedItem, setClickedItem] = useState(-1);
    const clickMeal = (index: number) => {
        if (displayList) {
            var newMeals = displayList

            dispatch( click({ index: index }) );

            if (clickedItem >= 0)
                dispatch( click({ index: clickedItem }) );
            
            setClickedItem(index)
        }
        return true;
    };

    return (
        <>
            {listToDisplay.map((item, index) => (
                item.isClicked ?
                    <ClickedMeal key={index} editClick={onEdit} deleteClick={onDelete} eatClick={onEat} displayItem={item} index={index}></ClickedMeal>
                    :
                    <UnclickedMeal key={index} onClick={clickMeal} item={item} index={index}></UnclickedMeal>
            ))}

        </>
    )
}

//Classes

const ClickedMeal: React.FC<ClickedMealProps> = ({ editClick, eatClick, deleteClick, displayItem, index }) => {
    const itemName = displayItem.type === 2 ? 
        displayItem.ingr ? 
            displayItem.ingr.name :
             "" 
        : 
        displayItem.meal ? 
            displayItem.meal.name :
             "";
    const [editClicked, setEditClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [eatError, setEatError] = useState(false)


    const [eatClicked, setEatClicked] = useState(false)

    const [ammToEat, setAmmToEat] = useState('');
    const [ammUnit, setAmmUnit] = useState<MeasuringUnitType>(MeasuringUnitType.G);
    const [eatMeal, setEatMeal] = useState<Meal>();

    const clickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEatClicked(true)
        setEatClicked(false)
    }
    const editClickCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEatClicked(false)
    }
    const submitMeal = () => {

    }

    const EatClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setEatClicked(false)
    }
    const setEatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setEatClicked(true)
        setEditClicked(false)
    }

    //TODO
    //Validate serving is number and check which unit is being used
    //If serving not number show message
    const eatSubmit = (e: any, index: number, ammString: string, unit: MeasuringUnitType) => {

        setEatClicked(false)

        if (Number.isNaN(ammString)) {

        } else {
            var amm = new Measurement(Number(ammString), unit) ;

            eatClick(index, amm.getValueInG())

        }
    }

    /*
    const editSubmit = (e: any, whichMeal: number, newCarbs: string,
        newFat: string, newProtein: string, newPortion: string
    ) => {
        setEditClicked(false)
        onClick(e, index, newCarbs, newFat, newProtein, newPortion)
    }
        */

    // const [carbsDisplay, setCarbs] = useState(carbs.toString);


    return (



        <div>
            <DivTable>

                <DivRow>


                    <DivCell>
                        <h2>{itemName}</h2>
                    </DivCell>


                    <DivCell>
                        <OperationButton onClick={setEatClick}>Eat</OperationButton>
                        <div></div>
                        <OperationButton onClick={clickEdit}>Edit</OperationButton>
                        <div></div>
                        <OperationButton onClick={(e: any) => deleteClick( index)} >Delete</OperationButton>
                    </DivCell>

                    <DivCellRight>
                        <div>
                            {
                            editClicked ?
                            <div></div>
                            /*
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
                                */
                                :
                                eatClicked
                                    ?
                                    <DivCell>
                                        <form>

                                            <StyledInput size={ammToEat.length || 1}
                                                type="text"
                                                id="name"
                                                placeholder=''
                                                value={ammToEat}
                                                onChange={(e) => setAmmToEat(e.target.value)}
                                                required>
                                            </StyledInput>
                                            <label>
                                                g
                                            </label>
                                            
                                        </form>
                                        <OperationButton onClick={(e: any) => eatSubmit(e, index, ammToEat, ammUnit)}>Submit</OperationButton>
                                        <OperationButton onClick={EatClickCancel} >Cancel</OperationButton>
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
                        </div>
                    </DivCellRight>
                </DivRow>
            </DivTable>
        </div>










    );
};

const UnclickedMeal: React.FC<UnclickedMealProps> = ({ onClick, item, index }) => {
    const [nameDisplay, setNameDisplay] = useState('');
    //const [carbsDisplay, setCarbs] = useState(carbs.toString);

useEffect(() => {
        if(item.type === 2) {
            if(item.ingr)
            setNameDisplay(item.ingr.name);
        } else if(item.type === 1) {
            if(item.meal)
            setNameDisplay(item.meal.name);
        }
    }, [item]);
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