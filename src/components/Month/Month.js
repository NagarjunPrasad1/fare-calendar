import React from 'react';
import Day from "../Day/Day";
import moment from "moment";
import Weeks from "./Weeks/Weeks";
import "../../assets/css/FareCalendar.css";

const Month = (props) => {
    const dateAndPriceMonth = props.monthData;
    // console.log(dateAndPriceMonth);
    var blankDays = [];
    var blankDaysEnd = [];
    var noOfBlankDays = null; 
    var noOfBlankDaysEnd = null; 
    const firstDayOfMonth = moment(props.monthName).startOf('month').format("ddd").toLowerCase();
    const lastDayOfMonth = moment(props.monthName).endOf('month').format("ddd").toLowerCase();
    if(firstDayOfMonth === 'mon'){
        noOfBlankDays = 1;
    } else if(firstDayOfMonth === 'tue'){
        noOfBlankDays = 2;
    } else if(firstDayOfMonth === 'wed'){
        noOfBlankDays = 3;
    } else if(firstDayOfMonth === 'thu'){
        noOfBlankDays = 4;
    } else if(firstDayOfMonth === 'fri'){
        noOfBlankDays = 5;
    } else if(firstDayOfMonth === 'sat'){
        noOfBlankDays = 6;
    } else if(firstDayOfMonth === 'sun'){
        noOfBlankDays = null;
    }
    
    if(lastDayOfMonth === 'mon'){
        noOfBlankDaysEnd = 5;
    } else if(lastDayOfMonth === 'tue'){
        noOfBlankDaysEnd = 4;
    } else if(lastDayOfMonth === 'wed'){
        noOfBlankDaysEnd = 3;
    } else if(lastDayOfMonth === 'thu'){
        noOfBlankDaysEnd = 2;
    } else if(lastDayOfMonth === 'fri'){
        noOfBlankDaysEnd = 1;
    } else if(lastDayOfMonth === 'sat'){
        noOfBlankDaysEnd = null;
    } else if(lastDayOfMonth === 'sun'){
        noOfBlankDaysEnd = 6;
    }

    if(noOfBlankDays !== null){
        for(var i=0;i<noOfBlankDays;i++){
            blankDays.push(<li className='days' key={i}></li>);
        }
    }
    
    if(noOfBlankDaysEnd !== null){
        for (i = 0; i < noOfBlankDaysEnd; i++) {
            blankDaysEnd.push(<li className='days' key={i}></li>);
        }
    }
    const minPrice = Math.min.apply(Math, dateAndPriceMonth.map(function (d) { 
        if(d.price!== null){
            return d.price; 
        } else {
            return 99999999;
        }
    }));

    const days = dateAndPriceMonth.map(d => { 
        return <Day selectedDate = {props.selectedDate} 
                currentDate = {props.currentDate} 
                date={d.date} 
                price={d.price} 
                key={d.date}
                minPrice ={minPrice} 
                clicked={() => props.clicked(d.date)} 
                returnDate = {props.returnDate}
                currentDisplayed = {props.currentDisplayed}/>
    });
    return (
        <div className="month">
            <span className="monthName"> {moment(props.monthName).format('MMM YYYY')} </span>
            <Weeks />
            <ul className="days">
                {blankDays}
                {days}
                {blankDaysEnd}
            </ul>
        </div>
    );
};

export default Month;