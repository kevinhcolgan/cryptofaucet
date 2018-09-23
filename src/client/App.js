import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: null,
            txid: null,
            isLoading: null,
            statusMessage: null,
            appStatus: null
        };
    }
    render() {
        return (
            <div className="App">
            This is a test
        </div>
    );
    }
}

export default App;
