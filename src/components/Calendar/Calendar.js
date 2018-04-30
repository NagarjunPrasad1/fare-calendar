import React, { Component } from 'react';
import Month from "../Month/Month";
import moment from "moment";
import axios from "axios";
import SelectedDate from "./SelectedDate/SelectedDate";

class Calendar extends Component {
    state = {
        currentDate: moment().format("YYYYMMDD"),
        dateAndPrice: [],
        dateSelected: moment(),
        returnDate: null,
        src: this.props.src,
        des: this.props.des,
        roundTrip: this.props.roundTrip,
        currentDisplayed: this.props.toBeDisplayed,
        mean: null
    } 

    componentWillMount() {
        if(this.props.onwardDate && this.props.returnDate){
            this.setState({
                dateSelected: this.props.onwardDate,
                returnDate: this.props.returnDate
            })
        } 
        axios.get("https://atob.goibibo.com/minfare/v2/web/o/"+ this.state.src + "/" + this.state.des+ "/" + this.state.currentDate + "?ma=11")
        .then( response => {
            var tempDate = moment().startOf('month').clone();
            const endDate = moment().add(11,'months').endOf('month');
            var dateAndPrice = [[],[],[],[],[],[],[],[],[],[],[],[]];
            while (tempDate.isSameOrBefore(endDate)) {
                let dnp = {};
                dnp.date = tempDate.format("YYYYMMDD");
                dnp.price = null;
                if (typeof response.data.data[tempDate.format("YYYYMMDD")] !== 'undefined' ){
                    dnp.price = response.data.data[tempDate.format("YYYYMMDD")]["p"];
                }
                dateAndPrice[tempDate.month()].push(dnp);
                tempDate.add(1,'d');
            }
            var tempDateAndPrice = dateAndPrice.splice(moment().month());
            dateAndPrice = tempDateAndPrice.concat(dateAndPrice);
            if (this.state.roundTrip === true) {
                const currentDate = this.state.dateSelected.clone();
                const returnDate = currentDate.add(2, 'd');
                this.setState({ returnDate,dateAndPrice });
            } else {
                this.setState({dateAndPrice});
            }
        }).catch((err)=>{
            console.log("ERROR:" + err)
        });
    }

    selectDateHandler = (date) => {
        if(this.state.currentDisplayed === 'onwardFareCal'){
            const newDateSelected = moment(date);
            if (this.props.roundTrip === true && moment(this.state.returnDate).isBefore(moment(newDateSelected))){
                const newReturnDate = newDateSelected.clone();
                newReturnDate.add(1,'d');
                this.setState({dateSelected:newDateSelected,returnDate:newReturnDate});
                this.returnDateClickedHandler();
            } else {
                this.setState({dateSelected:newDateSelected});
            }
            
        } else if (this.state.currentDisplayed === 'returnFareCal'){
            const newDateSelected = moment(date);
            if (moment(newDateSelected).isSameOrAfter(this.state.dateSelected)){
                this.setState({returnDate:newDateSelected});
            } 
        }
    }

    onwardDateClickedHandler = () => {
        const nowShowing = this.state.currentDisplayed;
        if(nowShowing === 'onwardFareCal'){
            return;
        } 
        const oldSrc = this.state.src;
        const oldDes = this.state.des;
        axios.get("https://atob.goibibo.com/minfare/v2/web/o/" + oldDes + "/" + oldSrc + "/" + this.state.currentDate + "?ma=11")
            .then(response => {
                var tempDate = moment().startOf('month').clone();
                const endDate = moment().add(11, 'months').endOf('month');
                var dateAndPrice = [[], [], [], [], [], [], [], [], [], [], [], []];
                while (tempDate.isSameOrBefore(endDate)) {
                    let dnp = {};
                    dnp.date = tempDate.format("YYYYMMDD");
                    dnp.price = null;
                    if (typeof response.data.data[tempDate.format("YYYYMMDD")] !== 'undefined') {
                        dnp.price = response.data.data[tempDate.format("YYYYMMDD")]["p"];
                    }
                    dateAndPrice[tempDate.month()].push(dnp);
                    tempDate.add(1, 'd');
                }
                var tempDateAndPrice = dateAndPrice.splice(moment().month());
                dateAndPrice = tempDateAndPrice.concat(dateAndPrice);
                const newCurrentDisplayed = 'onwardFareCal';
                this.setState({
                    src:oldDes,
                    des:oldSrc,
                    currentDisplayed:newCurrentDisplayed,
                    dateAndPrice:dateAndPrice
                });
            }).catch((err) => {
                console.log("ERROR:" + err)
            });
    }
    
    returnDateClickedHandler = () => {
        const nowShowing = this.state.currentDisplayed;
        if (nowShowing === 'returnFareCal') {
            return;
        }
        const oldSrc = this.state.src;
        const oldDes = this.state.des;
        axios.get("https://atob.goibibo.com/minfare/v2/web/o/" + oldDes + "/" + oldSrc + "/" + this.state.currentDate + "?ma=11")
        .then(response => {
            var tempDate = moment().startOf('month').clone();
            const endDate = moment().add(11, 'months').endOf('month');
            var dateAndPrice = [[], [], [], [], [], [], [], [], [], [], [], []];
            while (tempDate.isSameOrBefore(endDate)) {
                let dnp = {};
                dnp.date = tempDate.format("YYYYMMDD");
                dnp.price = null;
                if (typeof response.data.data[tempDate.format("YYYYMMDD")] !== 'undefined') {
                    dnp.price = response.data.data[tempDate.format("YYYYMMDD")]["p"];
                }
                dateAndPrice[tempDate.month()].push(dnp);
                tempDate.add(1, 'd');
            }
            var tempDateAndPrice = dateAndPrice.splice(moment().month());
            dateAndPrice = tempDateAndPrice.concat(dateAndPrice);
            const newCurrentDisplayed = 'returnFareCal';
            this.setState({
                src: oldDes,
                des: oldSrc,
                currentDisplayed: newCurrentDisplayed,
                    dateAndPrice:dateAndPrice
                });     
            }).catch((err) => {
                console.log("ERROR:" + err)
            });
    }

    render() {
        
        const dateAndPrice = this.state.dateAndPrice;
        const months = dateAndPrice.map((m,ind) =>{
            return <Month selectedDate = {this.state.dateSelected} 
            currentDate = {this.state.currentDate} 
            monthData = {m} 
            monthName = {m[ind].date} 
            key = {ind} 
            clicked = {this.selectDateHandler}
            returnDate = {this.state.returnDate} 
            currentDisplayed = {this.state.currentDisplayed}/>
        });

        return (
            <div>
                <SelectedDate onwardDate={moment(this.state.dateSelected)} 
                    returnDate={this.state.roundTrip === true ? moment(this.state.returnDate):null}
                    onwardDateHeaderClick = {this.onwardDateClickedHandler}
                    returnDateHeaderClick = {this.returnDateClickedHandler}
                    currentDisplayed={this.state.currentDisplayed}/>
                {months}
            </div>
        );
    }
}

export default Calendar;