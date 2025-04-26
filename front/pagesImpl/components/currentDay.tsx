import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Ccal, EatenEntry, Fcal, DivRow, StyledListItem } from './commonTypes';


interface CurrentDayProp {
    eaten: Array<EatenEntry> | undefined;
    date: Date | undefined;
    changeDay: (day: Date) => void


}

const CurrentDay = (props: CurrentDayProp): React.JSX.Element => {

    const [selectedDate, setSelectedDate] = useState<Date>();
    const timeSelectPrompt = "Select a day"
    const [eatenCalories, setEatenCalories] = useState(0);
    const [eatenProtein, setEatenProtein] = useState(0);
    const [eatenList, setEatenList] = useState(props.eaten)

    const [editClicked, setEditClicked] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)

    const updateAmm = (e: any, index: Number, newAmm: String) => {

    }

    const ChangeDay = (date: Date | null) => {
        if (date) {


            var formatedDate: Date = new Date();
            formatedDate.setFullYear(date.getFullYear());
            formatedDate.setMonth(date.getMonth());
            formatedDate.setDate(date.getDate());
            //setSelectedDate(formatedDate)
            props.changeDay(formatedDate);
        }
    }

    useEffect(() => {
        var totalCal = 0;
        var totalP = 0;
        if (eatenList) {

            eatenList.forEach((element) => {

                totalCal += element.cal;
                totalP += element.p;
            });
        }
        setEatenProtein(totalP);
        setEatenCalories(totalCal);
        console.log('in currentDay eatenList dependent eatenList. Current EatenList : ' + eatenList)

    }, [eatenList]);

    useEffect(() => {


    }, [props]);
    useEffect(() => {
        if (props.date) {
            setSelectedDate(props.date)
        }

    }, []);

    return (
        <>
            <h1>
                {selectedDate ? selectedDate.toString() : timeSelectPrompt} </h1>

            <DatePicker selected={selectedDate} onChange={(date) => date ? ChangeDay(date) : () => { return false; }} />
            <EatenMealWrapper>
                <h1>Calories: {eatenCalories}</h1>
                <h1>Protein: {eatenProtein} </h1>
                <ul>
                    {eatenList ? eatenList.map((item, index) => (
                        <StyledListItem>
                            {item.name}
                            {
                                //TODO edit and delete icons
                            }
                            <OpButton key={'edit'+{index}}> </OpButton>
                            <OpButton key={'delete'+{index}}> </OpButton>
                            {item.editClicked
                                ?
                            <StyledInput size={String(item.servings).length || 1}
                                type="text"
                                id="name"
                                placeholder={String(item.servings)}
                                value={item.servings}
                                onChange={(e) => updateAmm(e,  index, e.target.value,)}>
                            </StyledInput> 
                            : <></> }
                            
                        </StyledListItem>
                    ))
                        :
                        <li></li>
                    }
                </ul>
            </EatenMealWrapper>


        </>
    )
}

export default CurrentDay;

const EatenMealWrapper = styled.div`



`
const StyledInput = styled.input`

margin: 1vw;
padding: 2px;

border-radius: 5px;
`

const OpButton = styled.button`
height: 20px;
width: 20px
`
