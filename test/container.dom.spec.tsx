import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { Container } from '../sources/container/container';

const expect = chai.expect;
chai.use(chaiSpies);

describe('DOM: Container', () => {
    let div: HTMLDivElement = null;
    let style: HTMLStyleElement = null;

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

    it('shoud have scrollbars if child is not fit to client rectangle', () => {
        ReactDOM.render(
            <Container id="container" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                overflowX="auto" overflowY="auto">
                <div style={{top: "260px", left: "280px"}} className="divClass" />
            </Container>,
            div);

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        expect(element).to.have.property('offsetWidth', 200);
        expect(element).to.have.property('offsetHeight', 200);
        expect(element).to.have.property('offsetLeft', 40);
        expect(element).to.have.property('offsetTop', 40);

        let scrollable = element.querySelector('.react-container-container-scrollable');
        expect(scrollable).to.exist;

        expect(scrollable).to.have.property('scrollWidth', 300);
        expect(scrollable).to.have.property('scrollHeight', 280);
    });

    it('shoud fire onScrollPosChanged event when it is scrolled', () => {
        let handleScrollPosChanged = chai.spy((left: number, top: number) => { return; });

        let container = ReactDOM.render(
            <Container id="container" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                overflowX="auto" overflowY="auto"
                onScrollPosChanged={handleScrollPosChanged}>
                <div style={{top: "260px", left: "280px"}} className="divClass" />
            </Container>,
            div) as Container;

        let element = document.body.querySelector('#container');
        let scrollable = element.querySelector('.react-container-container-scrollable');

        scrollable.scrollLeft = 20;
        scrollable.scrollTop = 10;

        let e = document.createEvent('CustomEvent');
        e.initCustomEvent('scroll', true, true, null);
        scrollable.dispatchEvent(e);

        expect(handleScrollPosChanged).to.have.been.called.once;
        expect(handleScrollPosChanged).to.have.been.called.with.exactly(20, 10);

        expect(container.state).to.exist;
        expect(container.state).has.property('scrollLeft', 20);
        expect(container.state).has.property('scrollTop', 10);
    });
});
