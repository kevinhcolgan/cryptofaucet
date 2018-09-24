import React from 'react';
import ReactDOM from 'react-dom';
require('./setupTests');
import App from './App';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
const faucetConstants = require('../lib/faucet_constants')
//global.fetch = require('jest-fetch-mock')


describe('App', () => {
    //mock componentDidMount so we don't have fetch calls triggered
    it('should render without throwing an error', () => {
        let ComponentTest = class extends App {
            componentDidMount() {
                // your override here
            }
        };
        expect(shallow(<ComponentTest />).find('form.faucet').exists()).to.equal(true)
    });

    describe('when the page loads', () => {
        //example of testing fetch with promise here https://github.com/airbnb/enzyme/issues/346
        it("the balance should only be available once the fetch call completes", () => {
            let ComponentTest = class extends App {
                componentDidMount() {
                    // your override here
                }
            };
            const wrapper = mount(<ComponentTest />);
            expect(wrapper.find('.balance').length).to.equal(1);

            expect(wrapper.find('.balance').text()).to.equal(' - ');

            let testBalance = '0.9';
            wrapper.setState({ balance: testBalance});

            expect(wrapper.find('.balance').text().trim()).to.equal(testBalance.trim());

            wrapper.unmount();
        });

    });
    describe('when the form is submitted to get some crypto from the Faucet', () => {
        it("the submit button should be disabled when the form is submitted", () => {
            let ComponentTest = class extends App {
                componentDidMount() {
                    // your override here
                }
            };
            const wrapper = mount(<ComponentTest />);
            const addressInput = wrapper.find("#address")
            addressInput.instance().value = "test address"
            var renderedForm = wrapper.find('form.faucet');
            expect(renderedForm.length).to.equal(1);
            renderedForm.simulate('submit');
            console.log(`renderedForm.find('[type=\"submit\"]').props() = ${JSON.stringify(renderedForm.find('[type="submit"]').props())}` );

            wrapper.unmount();
        });

        it("a message should be shown when a faucet request returns", () => {
            let ComponentTest = class extends App {
                componentDidMount() {
                    // your override here
                }
            };
            const wrapper = mount(<ComponentTest />);
            expect(wrapper.find('.status-message').text()).to.equal('');

            let statusTestText = 'test status message';
            wrapper.setState({ statusMessage: statusTestText});
            expect(wrapper.find('.status-message').text()).to.equal(statusTestText);

            wrapper.unmount();
        });
        it("the transaction id should be available when a faucet request returns successfully", () => {

            let ComponentTest = class extends App {
                componentDidMount() {
                    // your override here
                }
            };
            const wrapper = mount(<ComponentTest />);

            expect(wrapper.find('.txid')).to.have.lengthOf(1);

            let successStatus = faucetConstants.APP_STATUS.TX_SUCCESS;
            let testTxId = "osidf8ysdfjsdjfs8df9u";

            wrapper.setState({ txid: testTxId});

            expect(wrapper.find('.txid').props().value).to.equal(testTxId);

            wrapper.unmount();
        });
    });

});
