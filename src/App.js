import React, { Component } from 'react';
import './App.css';
import Calendar from "./components/Calendar/Calendar";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar roundTrip={true} src="BLR" des="DEL" toBeDisplayed = "returnFareCal"/>
      </div>
    );
  }
}

export default App;
