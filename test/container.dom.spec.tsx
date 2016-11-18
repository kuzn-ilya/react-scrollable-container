import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as assign from 'object-assign';
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

        let element = document.body.querySelector('#container') as HTMLElement;
        expect(element).to.exist;

        expect(element.offsetWidth).to.be.equal(200);
        expect(element.offsetHeight).to.be.equal(200);
        expect(element.offsetLeft).to.be.equal(40);
        expect(element.offsetTop).to.be.equal(40);

        let scrollable = element.querySelector('.react-container-container-scrollable');
        expect(scrollable).to.exist;

        expect(scrollable.scrollWidth).equal(300);
        expect(scrollable.scrollHeight).equal(280);
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

        expect(container).to.exist;

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
        expect(container.state.scrollLeft).to.be.equal(20);
        expect(container.state.scrollTop).to.be.equal(10);
    });

    it('shoud have a scrollbar when contentWidth and contentHeight set up to values greater than width and height', () => {
        let container = ReactDOM.render(
            <Container id="container" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                overflowX="auto" overflowY="auto"
                contentHeight={300} contentWidth={400}
                />,
            div) as Container;

        expect(container).to.exist;
        expect(container.props).has.property('contentWidth')

        let element = document.body.querySelector('#container');
        let scrollable = element.querySelector('.react-container-container-scrollable');

        expect(scrollable).to.exist;
        expect(scrollable.scrollWidth).equal(400);
        expect(scrollable.scrollHeight).equal(300);
    });

    it('shoud have a horizontal scrollbar when contentWidth greater than width', () => {
        let container = ReactDOM.render(
            <Container id="container" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                overflowX="auto" overflowY="auto"
                contentWidth={400} />,
            div) as Container;

        expect(container).to.exist;

        let element = document.body.querySelector('#container');
        let scrollable = element.querySelector('.react-container-container-scrollable') as HTMLElement;

        expect(scrollable).to.exist;
        expect(scrollable.scrollHeight).equal(scrollable.clientHeight);
        expect(scrollable.scrollWidth).equal(400);
        expect(scrollable.offsetHeight).equal(200);
    });

    it('shoud have a vertical scrollbar when contentHeight greater than height', () => {
        let container = ReactDOM.render(
            <Container id="container" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                overflowX="auto" overflowY="auto"
                contentHeight={400} />,
            div) as Container;

        expect(container).to.exist;

        let element = document.body.querySelector('#container');
        let scrollable = element.querySelector('.react-container-container-scrollable') as HTMLElement;

        expect(scrollable).to.exist;
        expect(scrollable.scrollWidth).equal(scrollable.clientWidth);
        expect(scrollable.scrollHeight).equal(400);
        expect(scrollable.offsetWidth).equal(200);
    });

    it('shoud be able to sync scroll bars of two containers', () => {

        class Comp extends React.Component<{}, { x: number, y: number }> {
            constructor(props: {}) {
                super(props);
                this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
                this.state = { x: 0, y: 0 };
            }

            handleScrollPosChanged: (x: number, y: number) => void = (x, y) => {
                console.log("x", x, "y", y);
                this.setState(assign(this.state, { x, y }));
            };

            render() {
                return (
                    <div>
                        <Container id="container1" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                            overflowX="auto" overflowY="auto"
                            contentHeight={400}
                            onScrollPosChanged={this.handleScrollPosChanged}
                            scrollLeft={this.state.x}
                            scrollTop={this.state.y}
                             />
                        <Container id="container2" style={{left: "40px", top: "240px", width: "200px", height: "200px"}}
                            overflowX="auto" overflowY="auto"
                            contentHeight={400}
                            onScrollPosChanged={this.handleScrollPosChanged}
                            scrollLeft={this.state.x}
                            scrollTop={this.state.y}
                            />
                    </div>
                );
            }

        }

        let container = ReactDOM.render(
            <Comp />,
            div) as Container;

        expect(container).to.exist;

        let element1 = document.body.querySelector('#container1');
        let scrollable1 = element1.querySelector('.react-container-container-scrollable') as HTMLElement;

        expect(scrollable1).to.exist;

        scrollable1.scrollLeft = 20;
        scrollable1.scrollTop = 10;

        let e = document.createEvent('CustomEvent');
        e.initCustomEvent('scroll', true, true, null);
        scrollable1.dispatchEvent(e);

        let element2 = document.body.querySelector('#container2');
        let scrollable2 = element2.querySelector('.react-container-container-scrollable') as HTMLElement;
        expect(scrollable2).to.exist;

        expect(scrollable2.scrollLeft).to.be.equal(20);
        expect(scrollable2.scrollTop).to.be.equal(10);
    });
});
