import React, { Component } from 'react';
import './App.css';
import LoadingSpinner from './LoadingSpinner';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCheckCircle, faExclamationCircle, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faCheckCircle)
library.add(faExclamationCircle)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: null,
            txid: null,
            isLoading: null,
            statusMessage: null,
            statusCode: null,
            address:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getStatusIcon = this.getStatusIcon.bind(this);
    }
    //https://www.valentinog.com/blog/how-async-await-in-react/
    /*
    async componentDidMount() {

        try {
            const response = await fetch('/api/getBalance');
            const data = await response.json();

            this.setState(() => ({
                balance: data.balance
            }));
        } catch (error) {
            console.log(error);
        }

    }
    */

    componentDidMount() {

        fetch('/api/getBalance')
            .then(res => res.json())
            .then(data => this.setState(() => ({
                balance: data.balance
            })));

    }


    handleSubmit(event) {

        event.preventDefault();

        const data = new FormData(event.target);
        const address = data.get('address');
        const cryptoSymbol = data.get('cryptoSymbol');
        this.setState(() => ({
            isLoading: true,
            statusMessage: `Attempting to send 0.0001 ${cryptoSymbol.toUpperCase()} to ${address}`
        }));


        fetch(`/api/sendCrypto?cryptoSymbol=${cryptoSymbol}&clientAddress=${address}`)
            .then(res => res.json())
            .then(data => this.setState(() => ({
                balance: data.balance,
                txid: data.txid,
                isLoading: false,
                statusMessage: data.statusMessage,
                statusCode: data.statusCode,
                address:data.address
                }
            ))).catch((error) => {
                this.setState(() => ({
                    isLoading: false
                }));
            });

    }

    getStatusIcon(statusCode,isLoading) {
        let useIcon = '';
        if(isLoading)
        {
            return <FontAwesomeIcon icon=''/>
        }
        else
        {
            if (statusCode === 'tx_success') {
                useIcon = `${faCheckCircle.iconName}`
            }
            else if (statusCode === 'tx_failed') {
                useIcon = `${faExclamationCircle.iconName}`
            }
            return <FontAwesomeIcon icon={useIcon}/>
        }


    }

    render() {
        const data = this.state;
        return (
            <div className="App">
                <h1>CryptoFaucet Faucet</h1>
                <h4>Just enter your Bitcoin testnet address to get a small amount of free tBTC</h4>
                <div className={'faucetFormContainer'}>
                    <form className='faucet' id="faucet-request" onSubmit={this.handleSubmit}>
                        <div className={'formElement'}>
                            <label htmlFor="cryptoSymbol">
                                Crypto Currency:
                                <select name="cryptoSymbol">
                                    <option value='tbtc'>TBTC</option>
                                </select>
                            </label>

                        </div>
                        <div className={'formElement'}>
                            <p>Available balance: <strong><span className='balance'>{data.balance ? ` ${data.balance} ` : data.isLoading ? <LoadingSpinner /> : ' - '}</span></strong>
                            </p>
                        </div>
                        <div className={'formElement'}>
                            <label htmlFor="address">
                                Address:
                                <input type="text" id="address" name="address" onChange={this.handleAddressChange} />
                            </label>
                            <input type='hidden' className='txid' value={data.txid || ''}/>
                            <button type='submit' disabled={data.isLoading}>Submit</button>
                        </div>


                    </form>

                    <div className={data.statusCode ? `formElement status-message ${data.statusCode}` : 'formElement status-message'}>
                        {data.isLoading ? <LoadingSpinner /> : ''}
                        {data.statusCode ? this.getStatusIcon(data.statusCode,data.isLoading) : ''}
                        {data.statusMessage ? `${data.statusMessage}` : ''}
                        {data.txid ? <p>You can view the transaction here: <a target="_blank" href={`https://live.blockcypher.com/btc-testnet/tx/${data.txid}/`}>https://live.blockcypher.com/btc-testnet/tx/{data.txid}/</a></p> : ''}
                        </div>
                </div>
            </div>
        );
    }
}

export default App;
