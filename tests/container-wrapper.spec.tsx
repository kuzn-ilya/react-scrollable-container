import * as React from 'react';
import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';

import { ContainerWrapper } from '../sources/container/container-wrapper';

const expect = chai.expect;
chai.use(chaiEnzyme());

const jsdom = require('jsdom-global');
jsdom();

describe('ContainerScrollable', () => {

    it('should be defined', () => {
        let wrapper = shallow(<ContainerWrapper/>);
        expect(wrapper).is.to.be;
    });

    it('should be able to unmount', () => {
        let wrapper = shallow(<ContainerWrapper/>);
        wrapper.unmount();
        expect(wrapper).is.to.be;
    });

    it('should have one div inside', () => {
        let wrapper = shallow(<ContainerWrapper/>);
        expect(wrapper.find('div')).to.have.length(1);
    });

    it('should have a class "react-container-container"', () => {
        let wrapper = shallow(<ContainerWrapper/>);
        expect(wrapper.find('div')).to.have.className('react-container-container-wrapper');
    });

    it('should render into document', () => {
        let wrapper = mount(<ContainerWrapper/>);
        expect(wrapper).is.to.be;
    });

    it('should be able to resize', () => {
        let wrapper = mount(<ContainerWrapper/>);
        expect(wrapper).is.to.be;
        window.resizeBy(100, 100);
        window.resizeBy(300, 300);
    });

    it('should have zero height and width for empty children', () => {
        let wrapper = mount(<ContainerWrapper/>);
        expect(wrapper).is.to.be;
        expect(wrapper).to.have.state('childrenWidth', 0);
        expect(wrapper).to.have.state('childrenHeight', 0);
    });

    it('should be able to render one children', () => {
        let wrapper = mount(
            <ContainerWrapper>
                <div>Text</div>
            </ContainerWrapper>
        );
        expect(wrapper.children).to.have.length(1);
        expect(wrapper.childAt(0)).is.to.be;
        expect(wrapper.childAt(0)).to.contain(<div>Text</div>);
    });

});
