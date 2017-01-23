import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import { UAParser } from 'ua-parser-js';

import { renderIntoDocument, unmountComponent, findRenderedComponentWithType } from '../../TestUtils';

import { Overflow, ScrollableContainer, ScrollableContent } from '../../../sources';

const expect = chai.expect;
chai.use(chaiSpies);

const isIE = new UAParser().getBrowser().name === 'IE';

// TODO: How can test window resize? Is it possible?
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

        expect(domElement.id).equals('container');
    });

    it('should have default values for contentWidth and contentHeight if they are not passed', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="hidden" height={100} width={100}/>);

        expect(container.props.contentWidth).equals('100%');
        expect(container.props.contentHeight).equals('100%');
    });

    ['auto', 'hidden', 'scroll', 'visible']
        .forEach((value: Overflow) => {
            it(`should have overflow "${value}" attribute if both overflowX and overflowY properties have "${value}" values`, () => {
                let container = renderIntoDocument(<ScrollableContainer overflowX={value} overflowY={value} height={100} width={100}/>);
                let domElement = ReactDOM.findDOMNode(container).firstChild as HTMLElement;
                if (isIE) {
                    expect(domElement.style.overflowX).equals(value);
                    expect(domElement.style.overflowY).equals(value);
                } else {
                    expect(domElement.style.overflow).equals(value);
                }
            });
        });

    it('should have different values for overflowX and overflowY attributes if both overflowX and overflowY are different', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="hidden" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container).firstChild as HTMLElement;

        expect(domElement.style.overflow).to.be.oneOf([null, undefined, '']);
        expect(domElement.style.overflowX).equals('auto');
        expect(domElement.style.overflowY).equals('hidden');
    });

    it('should be able to unmount', () => {
        let container = renderIntoDocument(<ScrollableContainer id="container" overflowX="auto"
            overflowY="hidden" height={100} width={100}/>);
        let parentElement = ReactDOM.findDOMNode(container).parentElement;
        expect(parentElement).to.exist;

        let element = parentElement!.querySelector('#container');
        expect(element).to.exist;

        unmountComponent(container);

        element = parentElement!.querySelector('#container');
        expect(element).to.not.exist;
    });

    it('should have a class "scrollable-container"', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="auto" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container);

        expect(domElement.classList).to.have.length(1);
        expect(domElement.classList[0]).equals('scrollable-container');
    });

    it('should have a class "scrollable-container-scrollable"', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="auto" height={100} width={100}/>);
        let domElement = ReactDOM.findDOMNode(container).firstChild as HTMLElement;

        expect(domElement.classList.contains('scrollable-container-scrollable')).to.be.true;
    });

    it('should have a child of type ScrollableContainerContent', () => {
        let container = renderIntoDocument(<ScrollableContainer overflowX="auto" overflowY="auto" height={100} width={100}/>);
        let child = findRenderedComponentWithType(container, ScrollableContent);

        expect(child).to.exist;
    });

});
