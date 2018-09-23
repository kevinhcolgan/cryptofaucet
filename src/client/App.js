import React, { Component } from 'react';
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState(() => ({
            isLoading: true
        }));
        event.preventDefault();
    }
    render() {
        const data = this.state;
        return (
            <div className="App">
                <form className={'faucet'} id="faucet" onSubmit={this.handleSubmit}>
                </form>
            </div>
        );
    }
}

export default App;
