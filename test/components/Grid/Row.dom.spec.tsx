import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List } from 'immutable';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import { simulateKeyDown, simulateKeyUp } from './../../TestUtils';
import { KeyConsts } from '../../../sources/utils';

import { Row, TextColumn } from '../../../sources';
import { TextColumnProps } from '../../../sources/components/Grid/Columns/TextColumn/TextColumnProps';

const expect = chai.expect;
chai.use(chaiSpies);

describe('DOM: Row', () => {
    let div: HTMLDivElement;
    let style: HTMLStyleElement;

    beforeEach(() => {
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `.divClass { 
            position: absolute; 
            display: inline-block; 
            width: 20px;
            height: 20px;
        }`;

        document.head.appendChild(style);

        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.margin = '0px';

        div = document.createElement('div');
        div.style.height = '100%';
        div.style.width = '100%';

        document.body.appendChild(div);
    });

    afterEach(() => {
        document.head.removeChild(style);
        document.body.removeChild(div);
    });

    it('should render TextCell', () => {
        let columnProps = List<TextColumnProps>([
            <TextColumn propName="first" width={30} />,
            <TextColumn propName="second" width={50} />,
        ].map((value) => value.props));

        ReactDOM.render(
                <Row
                    columnProps={columnProps}
                    data={{
                        first: 'first',
                        second: 'second'
                    }}
                    height={20}
                    rowIndex={0}
                    selected={false}
                >
                </Row>,
            div);

        expect(div.children).to.exist;
        expect(div.children.length).to.be.equal(1);
        let container = div.children[0] as HTMLElement;
        expect(container).to.exist;

        expect(container.children).to.exist;
        expect(container.children.length).to.be.equal(2);

        let first = container.children[0] as HTMLElement;
        expect(first).to.exist;
        expect(first.offsetHeight).to.be.equal(20);
        expect(first.offsetWidth).to.be.equal(30);

        let second = container.children[1] as HTMLElement;
        expect(second).to.exist;
        expect(second.offsetHeight).to.be.equal(20);
        expect(second.offsetWidth).to.be.equal(50);
    });

    it('should focus focused TextCell', () => {
        let columnProps = List<TextColumnProps>([
            <TextColumn readonly propName="first" width={30} />,
            <TextColumn propName="second" width={50} />,
        ].map((value) => value.props));

        ReactDOM.render(
                <Row
                    columnProps={columnProps}
                    data={{
                        first: 'first',
                        second: 'second'
                    }}
                    height={20}
                    rowIndex={0}
                    selected={false}
                    focusedCellPropName="first"
                >
                </Row>,
            div);
        expect(document.activeElement).to.exist;
        expect(document.activeElement.tagName).equals('DIV');
        expect(document.activeElement.className).equals('cell-wrapper');
    });

    it('should fire onMove event by keyboard "arrow right"', () => {
        // TODO: Not Implemented yet
        let columnProps = List<TextColumnProps>([
            <TextColumn readonly propName="first" width={30} />,
            <TextColumn readonly propName="second" width={50} />,
        ].map((value) => value.props));

        let handleMove = (direction: string, rowIndex: number, propName: string): void => void 0;
        let handleMoveSpy = chai.spy(handleMove);

        ReactDOM.render(
                <Row
                    columnProps={columnProps}
                    data={{
                        first: 'first',
                        second: 'second'
                    }}
                    height={20}
                    rowIndex={0}
                    selected={false}
                    focusedCellPropName="first"
                    onMove={handleMoveSpy}
                >
                </Row>,
            div);
        let firstCell = document.activeElement;
        expect(firstCell.tagName).equals('DIV');
        expect(firstCell.className).equals('cell-wrapper');

        simulateKeyDown(firstCell, KeyConsts.ARROW_RIGHT);
        simulateKeyUp(firstCell, KeyConsts.ARROW_RIGHT);

        expect(handleMoveSpy).to.have.been.called.once.and.called.with.exactly('right', 0, 'first');
    });
});
