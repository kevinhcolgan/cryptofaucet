import React from 'react';
require('./setupTests');
import { mount } from 'enzyme';
import LoadingIndicator from './LoadingIndicator'

describe('LoadingIndicator', () => {
    describe('when isLoading is false', () => {
        it('should render children', () => {
            const wrapper = mount(
                <LoadingIndicator isLoading={false}>
                <div>ahoy!</div>
            </LoadingIndicator>
        );
            expect(wrapper.html()).toEqual('<div>ahoy!</div>');
            wrapper.unmount();
        });
    });
});