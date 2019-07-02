import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(){
        super()
        this.state={
            isScanning:true,
            lastScan:"",
            scans:[]
        }
    }

    componentDidMount() {
        document.addEventListener("keydown",this._handleKeyDown.bind(this))
    }
    componentWillUnmount() {
        document.removeEventListener("keydown",this._handleKeyDown.bind(this))
    }

    _handleKeyDown = (e) => {
        console.log(e);
        if(e.key === "Enter") {
            var tmpScans = this.state.scans;
            tmpScans.push({text:this.state.lastScan})
            this.setState({ ...this.state, lastScan:"",scans:tmpScans });
        } 
        else if(e.key === "Unidentified"){
            alert("Unidentified key - ",e.code)
        }
        else {
            this.setState({ ...this.state, lastScan: this.state.lastScan+e.key  });
        }
        
    }

    _handleOnInput = (e) => {
        console.log("OnInput")
        console.log(e)
    }

    _handleOnSelect = (e) =>{
        alert("on select")
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Scanner Demo</h1>
        </header>
        <ScannerInput isScanning={this.state.isScanning} scan = {this.state.lastScan} InputEvent={this.state._handleOnInput} SelectEvent={this.state._handleOnSelect}/>
        <Results scans={this.state.scans}/>
      </div>
    );
  }
}

const ScannerInput = (props) => {
    return (  
        <div>
            <input type="text" placeholder="Scan barcode" readOnly={props.isScanning} value={props.scan}/>
        </div>
    );
}
const Results  = (props) => {
    return ( 
        <div>
            <ol>
                {props.scans.map(line  =>{
                    return <li>{line.text}</li>
                })}
            </ol>
        </div>
     );
}
 
export default App;