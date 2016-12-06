import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { renderIntoDocument, unmountComponent } from './../TestUtils';
import * as TestUtils from 'react-addons-test-utils';

import { mounted } from './../../sources/react/mounted';

const expect = chai.expect;
chai.use(chaiSpies);

describe('mounted', () => {

    class Comp extends React.Component<{prop: number}, {state: number}> {
        render(): JSX.Element {
            return <div>Prop: {this.props.prop}</div>;
        }
    }

    it('should be defined', () => {
        // tslint:disable-next-line:variable-name
        let Cmp = mounted(Comp, () => { return; }, () => { return; });
        let container = renderIntoDocument(<Cmp prop={42} />);
        let domElement = ReactDOM.findDOMNode(container);
        expect(domElement).to.exist;
    });

    it('should have same states', () => {
        // tslint:disable-next-line:variable-name
        let Cmp = mounted(Comp, () => { return; }, () => { return; });
        let container = renderIntoDocument<{prop: number}, {state: number}>(<Cmp prop={42} />);

        expect(container.props.prop).equal(42);

        let child = TestUtils.findRenderedComponentWithType(container, Comp);
        expect(child).to.exist;
        expect(child.props.prop).equal(42);
    });

    it('should call callbacks', () => {
        let handleMounted = chai.spy();
        let handleUnmounting = chai.spy();

        // tslint:disable-next-line:variable-name
        let Cmp = mounted(Comp, handleMounted, handleUnmounting);
        let container = renderIntoDocument(<Cmp prop={42} />);
        unmountComponent(container);

        expect(handleMounted).is.called.once;
        expect(handleUnmounting).is.called.once;
    });
});
