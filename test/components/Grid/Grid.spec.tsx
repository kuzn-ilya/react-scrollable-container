import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { renderIntoDocument } from '../../TestUtils';

import { Grid } from '../../../sources/components';

const expect = chai.expect;
chai.use(chaiSpies);

describe('Grid', () => {
    it('should be defined and have default props', () => {
        let container = renderIntoDocument(<Grid />) as Grid;

        expect(container).to.exist;
        expect(container.props.fixedColumnCount).to.be.equal(0);
        expect(container.props.fixedRowCount).to.be.equal(0);

        let domElement = ReactDOM.findDOMNode(container);

        expect(domElement).to.exist;
    });
});
