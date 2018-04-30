import React from 'react';
import "../../../assets/css/FareCalendar.css"

const Price = (props) => {
    
    var formatter = new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        currency: 'INR',
    });

    var formattedPrice = null;
    if(props.price){
        formattedPrice = formatter.format(props.price);
    } 

    const priceClasses = ['price'];
    if(props.price === props.minPrice){
        priceClasses.push('minPrice');
    }

    return (
        <div className={priceClasses.join(' ')}>
            {props.price ?"₹"+formattedPrice:"_"}
        </div>
    );
};

export default Price;