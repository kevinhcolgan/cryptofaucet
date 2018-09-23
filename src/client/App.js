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

    componentDidMount() {
        fetch('/api/getBalance')
            .then(res => res.json())
            .then(data => this.setState({ balance: data.balance, address: null, txid: null }));
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
                <h1>CryptoFaucet tBTC available:
                    <span className='balance'>{data.balance ? ` ${data.balance} ` : ' - '}</span>
                </h1>
                <form className='faucet' id="faucet-request" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="cryptoSymbol" id="cryptoSymbol" />
                    <label htmlFor="address">
                        Address:
                        <input type="text" id="address" name="address" onChange={this.handleAddressChange}/>
                    </label>
                    <input type='hidden' className='txid' value={data.txid || ''}/>
                    <button type='submit' disabled={data.isLoading}>Submit</button>
                </form>

                <p className='status-message'>{data.statusMessage ? `${data.statusMessage}` : ''}</p>

            </div>
        );
    }
}

export default App;
