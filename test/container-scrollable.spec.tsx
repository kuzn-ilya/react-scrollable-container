import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import * as chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';

import { ContainerScrollable } from '../sources/container/container-scrollable';

const expect = chai.expect;
chai.use(chaiEnzyme());
chai.use(chaiSpies);

describe('ContainerScrollable', () => {

    it('should be defined', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper).is.to.be;
    });

    it('should be able to unmount', () => {
        let wrapper = mount(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        wrapper.unmount();
        expect(wrapper).is.to.be;
    });

    it('should have one div inside', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper.find('div')).to.have.length(1);
    });

    it('should have a class "react-container-container-scrollable"', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper.find('div')).to.have.className('react-container-container-scrollable');
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

    it('should handle scroll event', () => {
        let handleScrollPosChanged = chai.spy();
        let wrapper = mount(<ContainerScrollable overflowX="auto" overflowY="auto" contentWidth={100} contentHeight = {200} 
            onScrollPosChanged={handleScrollPosChanged}/>);
        let el = ReactDOM.findDOMNode(wrapper.instance());
        let e = document.createEvent('UIEvent');
        e.initUIEvent('scroll', true, true, window, 10);
        el.dispatchEvent(e);
        expect(handleScrollPosChanged).has.been.called.once;
    });

});
