import React from 'react';
import moment from "moment";


const SelectedDate = (props) => {
    const onwardDate = props.onwardDate;
    const onwardDay = moment(onwardDate).format("DD");
    const onwardMonthAndYear = moment(onwardDate).format("MMM YYYY");
    
    const returnDate = props.returnDate;
    var returnDay = null;
    var returnMonthAndYear = null;
    if(props.returnDate && moment(returnDate).isValid && moment(returnDate).format()!=="Invalid date"){
        returnDay = moment(returnDate).format('DD');
        returnMonthAndYear = moment(returnDate).format("MMM YYYY");
    }

    const textStyle = {
        fontSize : "14px",
    };
    const textStyleDay = {
        fontSize: "34px"
    };
    
    const onwardHeaderClassList = [];
    const returnHeaderClassList = [];
    
    if(props.returnDate){
        onwardHeaderClassList.push("floatSelectedDateHeaderDiv");
        returnHeaderClassList.push("floatSelectedDateHeaderDiv");
    }

    if(props.returnDate && (props.currentDisplayed === 'onwardFareCal')){
        onwardHeaderClassList.push('underlineDiv');
        returnHeaderClassList.push('nonHighlightedDateHeader');
    } else if (props.returnDate && (props.currentDisplayed === 'returnFareCal')) {
        returnHeaderClassList.push('underlineDiv');
        onwardHeaderClassList.push('nonHighlightedDateHeader');
    }


    const onwardHeaderClass = onwardHeaderClassList.join(' ');
    const returnHeaderClass = returnHeaderClassList.join(' ');
    return (
        <div className="selectedDateHeader">
            <div className = {onwardHeaderClass} onClick = {props.onwardDateHeaderClick}>
                <span style = {textStyle}>Depart</span>
                <span style = {textStyleDay}>{onwardDay}</span>
                <span style = {textStyle}>{onwardMonthAndYear}</span>
            </div>
            {props.returnDate ? <div className={returnHeaderClass} onClick = {props.returnDateHeaderClick}>
                <span style = {textStyle}>Return</span>
                <span style = {textStyleDay}>{returnDay}</span>
                <span style = {textStyle}>{returnMonthAndYear}</span>
            </div>:null}
        </div>
    );
};

export default SelectedDate;