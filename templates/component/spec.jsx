import React from 'react';
import ReactDOM from 'react-dom';
import _XXNameXX_ from './xxNamexx.component';

describe('_XXNameXX_', () => {
    let component;
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
    });

    it('has expected', () => {
        component = ReactDOM.render(
            <_XXNameXX_/>,
            container
        );

        expect(component).to.not.be.false;
    });
});