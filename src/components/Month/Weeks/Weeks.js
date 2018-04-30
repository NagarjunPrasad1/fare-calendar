import React from 'react';
import "../../../assets/css/FareCalendar.css"

const Weeks = () => {
    return (
        <ul className="weekdays">
            <li className="days">Sun</li>
            <li className="days">Mon</li>
            <li className="days">Tue</li>
            <li className="days">Wed</li>
            <li className="days">Thu</li>
            <li className="days">Fri</li>
            <li className="days">Sat</li>
        </ul>
    );
};

export default Weeks;