import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import { is } from 'useragent';

import { renderIntoDocument, unmountComponent } from './test.utils';

import { Overflow } from '../sources/utils/types';
import { ScrollableContainer } from '../sources/container/ScrollableContainer';

const expect = chai.expect;
chai.use(chaiSpies);

// TODO How can test window reisize? Is it possible?
describe('ScrollableContainer', () => {

    it('should be defined', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="auto" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement).to.exist;
    });

    it('should have a <div> in the root', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="auto" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.tagName).to.be.oneOf(['div', 'DIV']);
    });

    it('should set an id attribute if passed', () => {
        let container = renderIntoDocument(<ScrollableContainer id="container"
            overflowX="auto" overflowY="hidden" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.id).equal('container');
    });

    ['auto', 'hidden', 'scroll', 'visible']
        .forEach((value: Overflow) => {
            it(`should have overflow "${value}" attribute if both overflowX and overflowY properties have "${value}" values`, () => {
                let container = renderIntoDocument(<ScrollableContainer overflowX={value} overflowY={value} height={100} width={100}/>);
                let domElement = ReactDOM.findDOMNode(container).firstChild as HTMLElement;
                if (is('IE')) {
                    expect(domElement.style.overflowX).to.be.equal(value);
                    expect(domElement.style.overflowY).to.be.equal(value);
                } else {
                    expect(domElement.style.overflow).to.be.equal(value);
                }
            });
        });

    it('should have different values for overflowX and overflowY attributes if both overflowX and overflowY are different', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="hidden" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container).firstChild as HTMLElement;
        expect(domElement.style.overflow).to.be.oneOf([null, undefined, '']);
        expect(domElement.style.overflowX).to.be.equal('auto');
        expect(domElement.style.overflowY).to.be.equal('hidden');
    });

    it('should be able to unmount', () => {
        let container = renderIntoDocument(<ScrollableContainer id="container" overflowX="auto"
            overflowY="hidden" height={100} width={100}/>);
        let parentElement = ReactDOM.findDOMNode(container).parentElement;

        let element = parentElement.querySelector('#container');
        expect(element).to.exist;

        unmountComponent(container);

        element = parentElement.querySelector('#container');
        expect(element).to.not.exist;
    });

    it('should have a class "react-container-container"', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="auto" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.classList).to.have.length(1);
        expect(domElement.classList[0]).to.be.equal('react-container-container');
    });

    it('should have a class "react-container-container-scrollable"', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="auto" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container).firstChild as HTMLElement;
        expect(domElement.classList).to.have.length(1);
        expect(domElement.classList[0]).to.be.equal('react-container-container-scrollable');
    });
});
