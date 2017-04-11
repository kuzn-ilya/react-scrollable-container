import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { renderIntoDocument } from '../../TestUtils';

import { Grid, Column, HeaderRow, Row } from '../../../sources';

const expect = chai.expect;
chai.use(chaiSpies);

describe('Grid', () => {
    it('should be defined and have default props', () => {
        let error = chai.spy.on(console, 'error');

        let container = renderIntoDocument(
            <Grid headerRowClass={HeaderRow} rowClass={Row} rowData={[]} rowHeight={20} headerHeight={20}/>
        ) as Grid;

        expect(container).to.exist;
        expect(container.props.fixedColumnCount).to.be.equal(0);
        expect(container.props.fixedRowCount).to.be.equal(0);

        let domElement = ReactDOM.findDOMNode(container);

        expect(domElement).to.exist;

        expect(error).to.have.been.not.called;
    });

    it('should calculate fixedColumnsWidth and scrollableColumnsWidth', () => {
        let error = chai.spy.on(console, 'error');

        let container = renderIntoDocument(
            <Grid headerRowClass={HeaderRow} rowClass={Row}
                fixedColumnCount={2} rowData={[]} rowHeight={20} headerHeight={20}
            >
                <Column width={20} propName="dummy"/>
                <Column width={40} propName="dummy"/>
                <Column width={60} propName="dummy"/>
                <Column width={80} propName="dummy"/>
            </Grid>
        ) as Grid;

        expect(container).to.exist;
        expect(container.props.fixedColumnCount).to.be.equal(2);
        expect(error).to.have.been.not.called;
    });
});
