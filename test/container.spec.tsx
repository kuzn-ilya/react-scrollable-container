import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import { renderIntoDocument, unmountComponent } from './test.utils';

import { Container } from '../sources/container/container';

const expect = chai.expect;

describe('Container', () => {

    it('should be defined', () => {
        let wrapper = renderIntoDocument(<Container overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(wrapper);
        expect(domElement).to.exist;
    });

    it('should be able to unmount', () => {
        let container = renderIntoDocument(<Container id="container" overflowX="auto" overflowY="auto"/>);
        let parentElement = ReactDOM.findDOMNode(container).parentElement;

        let element = parentElement.querySelector('#container');
        expect(element).to.exist;

        unmountComponent(container);

        element = parentElement.querySelector('#container');
        expect(element).to.not.exist;
    });

    it('should have a <div> in the root', () => {
        let container = renderIntoDocument(<Container overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.tagName).to.be.oneOf(['div', 'DIV']);
    });

    it('should have a class "react-container-container"', () => {
        let container = renderIntoDocument(<Container overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.classList).to.have.length(1);
        expect(domElement.classList[0]).to.be.equal('react-container-container');
    });

});
