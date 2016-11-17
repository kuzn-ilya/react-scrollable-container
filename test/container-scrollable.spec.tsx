import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { renderIntoDocument, unmountComponent } from './test.utils';

import { Overflow } from '../sources/utils/types';
import { ContainerScrollable } from '../sources/container/container-scrollable';

const expect = chai.expect;
chai.use(chaiSpies);

// TODO How can test window reisize? Is it possible?
describe('ContainerScrollable', () => {

    it('should be defined', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement).to.exist;
    });

    it('should have a <div> in the root', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.tagName).to.be.oneOf(['div', 'DIV']);
    });

    ['auto', 'hidden', 'scroll', 'visible']
        .forEach((value: Overflow) => {
            it(`should have overflow "${value}" attribute if both overflowX and overflowY properties have "${value}" values`, () => {
                let container = renderIntoDocument(<ContainerScrollable overflowX={value} overflowY={value}/>);
                let domElement = ReactDOM.findDOMNode(container) as HTMLElement;
                expect(domElement.style.overflow).to.be.equal(value);
            });
        });

    it('should have different values for overflowX and overflowY attributes if both overflowX and overflowY are different', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="hidden"/>);
        let domElement = ReactDOM.findDOMNode(container) as HTMLElement;
        expect(domElement.style.overflow).to.be.oneOf([null, undefined, '']);
        expect(domElement.style.overflowX).to.be.equal('auto');
        expect(domElement.style.overflowY).to.be.equal('hidden');
    });

    it('should be able to unmount', () => {
        let container = renderIntoDocument(<ContainerScrollable id="container" overflowX="auto" overflowY="hidden"/>);
        let parentElement = ReactDOM.findDOMNode(container).parentElement;

        let element = parentElement.querySelector('#container');
        expect(element).to.exist;

        unmountComponent(container);

        element = parentElement.querySelector('#container');
        expect(element).to.not.exist;
    });

    it('should have a class "react-container-container-scrollable"', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.classList).to.have.length(1);
        expect(domElement.classList[0]).to.be.equal('react-container-container-scrollable');
    });

    it('should have default contentHeight and contentWidth properties in the state', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(container.state).to.have.property('contentHeight', 'auto');
        expect(container.state).to.have.property('contentWidth', 'auto');
    });

    it('should have the same contentHeight and contentWidth properties in the state as for props', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto" 
            contentWidth={100} contentHeight = {200} />);
        expect(container.state).to.have.property('contentHeight', 200);
        expect(container.state).to.have.property('contentWidth', 100);
    });

    // TODO scroll event
    // it('should handle scroll event', () => {
    //     let handleScrollPosChanged = chai.spy((left: number, top: number) => { return; });
    //     let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto" 
    //         contentWidth={100} contentHeight={200} onScrollPosChanged={handleScrollPosChanged} />);
    //     let domElement = ReactDOM.findDOMNode(container);
    //     let e = document.createEvent('UIEvent');
    //     e.initUIEvent('scroll', true, true, window, 10);
    //     domElement.dispatchEvent(e);
    //     expect(handleScrollPosChanged).to.have.been.called();
    // });

});
