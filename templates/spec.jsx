import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.component';

describe('Home', () => {
    let component;
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
    });

    it('has expected', () => {
        const initialState = {};

        component = ReactDOM.render(
            <Home/>,
            container
        );

        expect(component).to.not.be.false;
    });
});