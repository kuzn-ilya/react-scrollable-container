import * as React from 'react';
import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';

import { ContainerScrollable } from '../sources/container/container-scrollable';

const expect = chai.expect;
chai.use(chaiEnzyme());

const jsdom = require('jsdom-global');
jsdom();

describe('ContainerScrollable', () => {

    it('should be defined', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper).is.to.be;
    });

    it('should be able to unmount', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        wrapper.unmount();
        expect(wrapper).is.to.be;
    });

    it('should have one div inside', () => {
        let wrapper = shallow(<ContainerScrollable overflowX="auto" overflowY="auto"/>);
        expect(wrapper.find('div')).to.have.length(1);
    });

    it('should have a class "react-container-container"', () => {
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
        window.resizeBy(100, 100);
        window.resizeBy(300, 300);
    });
});
