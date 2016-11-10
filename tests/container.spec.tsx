import * as React from 'react';
import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import { Container } from '../sources/container/container';

const expect = chai.expect;
chai.use(chaiEnzyme());

describe('Container', () => {

    it('should be defined', () => {
        let container = shallow(<Container overflowX="auto" overflowY="auto"/>);
        expect(container).is.to.be;
    });

    it('should have one div inside', () => {
        let container = shallow(<Container overflowX="auto" overflowY="auto"/>);
        expect(container.find('div')).to.have.length(1);
    });

    it('should have a class "react-container-container"', () => {
        let container = shallow(<Container overflowX="auto" overflowY="auto"/>);
        expect(container.find('div')).to.have.className('react-container-container');
    });
});
