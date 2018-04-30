import React from 'react';
import Price from "./Price/Price";
import moment from "moment";

const Day = (props) => {
    const dateSelectedClasses = [];
    const currentDateClass = ['days'];

    //Make the current day Orange
    if(moment(props.currentDate).format("YYYYMMDD") === moment(props.date).format("YYYYMMDD")){
        dateSelectedClasses.push('currentDay');
    }
    //Make selected day blue
    if(moment(props.date).format("DDMMYYYY") === moment(props.selectedDate).format("DDMMYYYY")){
        if(props.currentDisplayed === 'onwardFareCal'){
            dateSelectedClasses.push('selectedDay');
        } else {
            dateSelectedClasses.push('selectedDayAtReturn');
        }
    }
    //For return date
    if ((moment(props.date).format("DDMMYYYY") === moment(props.returnDate).format("DDMMYYYY")) && props.currentDisplayed === 'returnFareCal'){
        dateSelectedClasses.push('selectedDay');
    }

    //Disable pointer action for previous dates
    if(moment(props.date).isBefore(moment(props.currentDate))){
        currentDateClass.push('disabledDates');
    }
    
    if (props.currentDisplayed === 'returnFareCal' && moment(props.date).isBefore(moment(props.selectedDate))){
        currentDateClass.push('disabledDates');
    }

    if (props.currentDisplayed === 'returnFareCal' && moment(props.date).isBetween(moment(props.selectedDate),moment(props.returnDate))){
        dateSelectedClasses.push('datesBetweenSelectedAndReturn');
    }

    return (
        <li className={currentDateClass.join(' ')} 
            onClick={props.clicked}> 
            <span className={dateSelectedClasses.join(' ')}>
                {moment(props.date).format('D')}
            </span> 
            <Price price={props.price} minPrice = {props.minPrice} /> 
        </li>
    );
};

export default Day;