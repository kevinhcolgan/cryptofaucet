import React from 'react';
import ReactDOM from 'react-dom';
require('./setupTests');
import App from './App';
mport { shallow, mount, render } from 'enzyme';
import LoadingIndicator from "./LoadingIndicator";
const faucetConstants = require('../lib/faucet_constants')


//example setup for timers: https://medium.com/capital-one-developers/unit-testing-behavior-of-react-components-with-test-driven-development-ae15b03a3689
describe('App', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<App />).find('form.faucet').exists()).toBe(true)
    });
    describe('when the page loads', () => {
        it('ensures the state is set', () => {
            const promise = Promise.resolve(mockData);
            sinon.stub(global, 'fetch', () => promise);

            const wrapper = mount(<App />);

            return promise.then(() => {
                expect(wrapper.state()).to.have.property('dataReady', true);

                wrapper.update();
            }).then(() => {
                expect(wrapper.text()).to.contain('data is ready');
            });
        });

        //example of testing fetch with promise here https://github.com/airbnb/enzyme/issues/346
        it("the balance should only be available once the fetch call completes", () => {
            const wrapper = mount(<App />);

            expect(wrapper.find('.balance')).text().to.equal("-");

            let testBalance = '0.9';
            wrapper.setState({ balance: balance});

            expect(wrapper.find('.balance')).text().to.equal(testBalance);

            wrapper.unmount();
        });

    });
    describe('when the form is submitted to get some crypto from the Faucet', () => {
        it("the submit button should be disabled when the form is submitted", () => {

            const fakeEvent = { preventDefault: () => console.log('preventDefault') };

            const wrapper = mount(<App />);

            var renderedForm = wrapper.find('form[id=faucet-request');
            expect(renderedForm.length).toBe(1);
            renderedForm.simulate('submit', fakeEvent);

            expect(renderedForm.find('[type=submit]').props()).to.have.property('disabled', true);
            wrapper.unmount();
        });

        it("a message should be shown when a faucet request returns", () => {

            const wrapper = mount(<App />);

            expect(wrapper.find('.status-message')).to.have.lengthOf(0);

            let statusTestText = 'test status message';
            wrapper.setState({ statusMessage: statusTestText});

            expect(wrapper.find('.status-message')).text().to.equal(statusTestText);

            wrapper.unmount();
        });
        it("the transaction id should show when a faucet request returns successfully", () => {

            const wrapper = mount(<App />);

            expect(wrapper.find('.txid')).to.have.lengthOf(0);

            let successStatus = APP_STATUS.TX_SUCCESS;
            let testTxId = "osidf8ysdfjsdjfs8df9u";

            expect(wrapper.exists('.txid')).to.equal(true);
            expect(wrapper.find('.txid')).text().to.equal(testTxId);

            wrapper.unmount();
        });
    });
});