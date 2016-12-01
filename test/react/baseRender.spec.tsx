import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { renderIntoDocument } from './../test.utils';
import * as TestUtils from 'react-addons-test-utils';

import { baseRender } from './../../sources/react/baseRender';

const expect = chai.expect;
chai.use(chaiSpies);

describe('baseRender', () => {

    class Comp extends React.Component<{prop: number}, {state: number}> {
        render(): JSX.Element {
            return <div>Prop: {this.props.prop}</div>;
        }
    }

    it('should be defined', () => {
        // tslint:disable-next-line:variable-name
        let Cmp = baseRender(Comp);
        let container = renderIntoDocument(<Cmp prop={42} />);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement).to.exist;
    });

    it('should have same states', () => {
        // tslint:disable-next-line:variable-name
        let Cmp = baseRender(Comp);
        let container = renderIntoDocument<{prop: number}, {state: number}>(<Cmp prop={42} />);

        expect(container.props.prop).equal(42);

        let child = TestUtils.findRenderedComponentWithType(container, Comp);
        expect(child).to.exist;
        expect(child.props.prop).equal(42);
    });
});
