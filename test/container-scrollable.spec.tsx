import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import { shallow /*, mount */ } from 'enzyme';

import { ContainerScrollable } from '../sources/container/container-scrollable';
//import { globalJsdom } from './jsdom-helper';

const expect = chai.expect;
chai.use(chaiEnzyme());

describe('ContainerScrollable', () => {
    // let jsdom: () => void;
    // beforeEach((done: () => void) => {
    //     jsdom = globalJsdom('<!doctype html><html><head><meta charset="utf-8"></head><body><div id="app" /></body></html>');
    //     done();
    // });

    // afterEach((done: () => void) => {
    //     jsdom();
    //     done();
    // });

    it('should be defined', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper).is.to.be;
    });

    // TODO find out how it should be - now I don't understand what unmont call (applied to result of shallow) should do actually.
    // it('should be able to unmount', () => {
    //     let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
    //     wrapper.unmount();
    //     expect(wrapper).is.to.be;
    // });

    // it('should have one div inside', () => {
    //     let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
    //     expect(wrapper.find('div')).to.have.length(1);
    // });

    // it('should have a class "react-container-container-scrollable"', () => {
    //     let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
    //     expect(wrapper.find('div')).to.have.className('react-container-container-scrollable');
    // });

    // it('should render into document', () => {
    //     let wrapper = mount(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
    //     expect(wrapper).is.to.be;
    // });

    // it('should be able to resize', () => {
    //     let wrapper = mount(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
    //     expect(wrapper).is.to.be;

    //     window.dispatchEvent(new UIEvent('resize'));
    // });

    // it('should have default contentHeight and contentWidth properties in the state', () => {
    //     let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
    //     expect(wrapper).to.have.state('contentHeight', 'auto');
    //     expect(wrapper).to.have.state('contentWidth', 'auto');
    // });

    // it('should have the same contentHeight and contentWidth properties in the state as for props', () => {
    //     let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto" contentWidth={100} contentHeight = {200} />);
    //     expect(wrapper).to.have.state('contentHeight', 200);
    //     expect(wrapper).to.have.state('contentWidth', 100);
    // });

    // it('should handle scroll event', () => {
    //     ReactDOM.render(<ContainerScrollable overflowX="auto" overflowY="auto" contentWidth={100} contentHeight = {200} />,
    //         window.document.getElementById('app'));
    //     let div = document.querySelector('.react-container-container-scrollable');
    //     expect(div).is.to.be.not.null;
    //     let evt = new UIEvent('scroll', { detail: 10});
    //     div.dispatchEvent(evt);
    // });
});
