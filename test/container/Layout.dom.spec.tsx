import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { Layout } from '../../sources/container/Layout';

const expect = chai.expect;
chai.use(chaiSpies);

describe('DOM: Layout', () => {
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

    it('should have children with expected heights', () => {
        ReactDOM.render(
                <Layout
                    orientation="vertical"
                    width = "200px"
                    height = "200px"
                    firstChildHeight = "10px"
                >
                    <div>
                        <div style= {{display: 'block', height: '100%', width: '100%'}}/>
                    </div>
                    <div>
                        <div style= {{display: 'block', height: '100%', width: '100%'}}/>
                    </div>
                </Layout>,
            div);

        expect(div.children).to.exist;
        expect(div.children.length).to.be.equal(1);
        let container = div.children[0] as HTMLElement;
        expect(container).to.exist;

        expect(container.offsetWidth).to.be.equal(200);
        expect(container.offsetHeight).to.be.equal(200);

        expect(container.children).to.exist;
        expect(container.children.length).to.be.equal(2);

        let first = container.children[0] as HTMLElement;
        expect(first).to.exist;
        expect(first.offsetHeight).to.be.equal(10);

        expect(first.children).to.exist;
        expect(first.children.length).to.be.equal(1);

        // let firstDiv = first.children[0] as HTMLElement;
        // expect(firstDiv).to.exist;

        // expect(firstDiv.offsetHeight).to.be.equal(10);

        let second = container.children[1] as HTMLElement;
        expect(second).to.exist;
        expect(second.offsetHeight).to.be.equal(190);

        expect(second.children).to.exist;
        expect(second.children.length).to.be.equal(1);

        // let secondDiv = second.children[0] as HTMLElement;
        // expect(secondDiv).to.exist;

        // expect(secondDiv.offsetHeight).to.be.equal(190);
    });
});
