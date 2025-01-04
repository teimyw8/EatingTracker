import styled from '@emotion/styled';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CurrentDay = (): React.JSX.Element => {

    const [selectedDate, setSelectedDate] = useState<Date>();
    const timeSelectPrompt = "Select a day"
    const [eatenCalories, setEatenCalories] = useState(0);
    const [eatenProtein, setEatenProtein] = useState(0);

    return (
        <>
            <h1>
                {selectedDate ? selectedDate.toString() : timeSelectPrompt} </h1>

            <DatePicker selected={selectedDate} onChange={(date) => date ? setSelectedDate(date) : () => { return false; }} />
            <EatenMealWrapper>
                <h1>Calories: {eatenCalories}</h1>
                <h1>Protein: {eatenProtein} </h1>
            </EatenMealWrapper>

        </>
    )
}

export default CurrentDay;

const EatenMealWrapper = styled.div`

padding: 3vh

`