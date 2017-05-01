import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { TextColumn } from '../../../sources';
import { CellContainer } from '../../../sources/components/Grid/Cells/CellContainer';
import { simulateKeyDown, simulateKeyUp} from '../../TestUtils';
import { KeyConsts } from '../../../sources/utils';

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

    it('should focus readonly TextCell', () => {
        let columnProps = (<TextColumn readonly propName="first" width={30} />).props;

        let handleFocus = (rowIndex: number, propName: string, target: React.ReactInstance) => void 0;
        let spyHandleFocus = chai.spy(handleFocus);
        ReactDOM.render(
                <CellContainer
                    columnProps={columnProps}
                    height={20}
                    width={50}
                    rowIndex={0}
                    focused
                    onFocus={spyHandleFocus}
                >
                </CellContainer>,
            div);

        expect(document.activeElement).to.exist;
        expect(document.activeElement.tagName).equals('DIV');
        expect(document.activeElement.className).equals('cell-wrapper');

        expect(spyHandleFocus).to.have.been.called.once.and.called.with(0, 'first');
    });

    it('should focus editable TextCell', () => {
        let columnProps = (<TextColumn propName="first" width={30} />).props;

        let handleFocus = (rowIndex: number, propName: string, target: React.ReactInstance) => void 0;
        let spyHandleFocus = chai.spy(handleFocus);

        ReactDOM.render(
                <CellContainer
                    columnProps={columnProps}
                    height={20}
                    width={50}
                    rowIndex={0}
                    focused
                    onFocus={spyHandleFocus}
                >
                </CellContainer>,
            div);

        expect(document.activeElement).to.exist;
        expect(document.activeElement.tagName).equals('INPUT');
        expect(document.activeElement.className).equals('inplace-edit');

        expect(spyHandleFocus).to.have.been.called.once.and.called.with(0, 'first');
    });

    it('should fire onMove event whenever right key is pressed', () => {
        let columnProps = (<TextColumn readonly propName="first" width={30} />).props;
        let handleMove = (direction: string, rowIndex: number, propName: string) => void 0;
        let spyHanldeMove = chai.spy(handleMove);

        ReactDOM.render(
                <CellContainer
                    columnProps={columnProps}
                    height={20}
                    width={50}
                    rowIndex={0}
                    focused
                    onMove={spyHanldeMove}
                >
                </CellContainer>,
            div);

        expect(document.activeElement).to.exist;
        simulateKeyDown(document.activeElement, KeyConsts.ARROW_RIGHT);
        simulateKeyUp(document.activeElement, KeyConsts.ARROW_RIGHT);

        expect(spyHanldeMove).to.have.been.called.once.and.called.with.exactly('right', 0, 'first');
    });
});
