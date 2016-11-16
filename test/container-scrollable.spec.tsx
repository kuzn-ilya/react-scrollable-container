import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import * as chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import * as TestUtils from 'react-addons-test-utils';

import { Overflow } from '../sources/utils/types';
import { ContainerScrollable } from '../sources/container/container-scrollable';

const expect = chai.expect;
chai.use(chaiEnzyme());
chai.use(chaiSpies);

describe('ContainerScrollable', () => {

    function renderIntoDocument<P, S>(element: React.ReactElement<P>): React.Component<P, S> {
        return TestUtils.renderIntoDocument<P>(element) as React.Component<P, S>;
    }

    function unmountComponent<P, S>(component: React.Component<P, S>): void {
        let element = ReactDOM.findDOMNode(component);
        let parent = element.parentElement;
        ReactDOM.unmountComponentAtNode(parent);
    }

    it('should be defined', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement).to.be.exist;
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
        expect(element).is.exist;

        unmountComponent(container);

        element = parentElement.querySelector('#container');
        expect(element).is.not.exist;
    });

    it('should have a class "react-container-container-scrollable"', () => {
        let container = renderIntoDocument(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement.classList).to.have.length(1);
        expect(domElement.classList[0]).to.be.equal('react-container-container-scrollable');
    });

    it('should render into document', () => {
        let wrapper = mount(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper).is.to.be;
    });

    it('should be able to resize', () => {
        let wrapper = mount(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper).is.to.be;

        window.dispatchEvent(new Event('resize'));
    });

    it('should have default contentHeight and contentWidth properties in the state', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper).to.have.state('contentHeight', 'auto');
        expect(wrapper).to.have.state('contentWidth', 'auto');
    });

    it('should have the same contentHeight and contentWidth properties in the state as for props', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto" contentWidth={100} contentHeight = {200} />);
        expect(wrapper).to.have.state('contentHeight', 200);
        expect(wrapper).to.have.state('contentWidth', 100);
    });

    // it('should handle scroll event', () => {
    //     let handleScrollPosChanged = chai.spy();
    //     let wrapper = mount(<ContainerScrollable overflowX="auto" overflowY="auto" contentWidth={100} contentHeight = {200} 
    //         onScrollPosChanged={handleScrollPosChanged}/>);
    //     let el = ReactDOM.findDOMNode(wrapper.instance());
    //     let e = document.createEvent('UIEvent');
    //     e.initUIEvent('scroll', true, true, window, 10);
    //     el.dispatchEvent(e);
    //     expect(handleScrollPosChanged).has.been.called.once;
    // });

});
