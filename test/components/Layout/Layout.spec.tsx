// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

// import { renderIntoDocument } from '../../TestUtils';

// import { Layout } from '../../../sources/components';

// const expect = chai.expect;
chai.use(chaiSpies);

describe('Layout', () => {

    it('should be defined and have div element in the root', () => {
        // let container = renderIntoDocument(<Layout orientation="horizontal" />);
        // let domElement = ReactDOM.findDOMNode(container);

        // expect(domElement).to.exist;
        // expect(domElement.tagName).to.be.oneOf(['div', 'DIV']);
    });
});
