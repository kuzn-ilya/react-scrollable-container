import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { ScrollableContainer } from '../../../sources/components';
import { simulateScroll } from '../../TestUtils';

const expect = chai.expect;
chai.use(chaiSpies);

describe('DOM: ScrollableContainer', () => {
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

    it('should have scrollbars if child is not fit to client rectangle', () => {
        ReactDOM.render(
            <ScrollableContainer id="container"
                width = "200px"
                height = "200px"
                overflowX="auto" overflowY="auto">
                <div style={{left: '280px', top: '260px'}} className="divClass" />
            </ScrollableContainer>,
            div);

        let element = document.body.querySelector('#container') as HTMLElement;
        expect(element).to.exist;

        expect(element.offsetWidth).equals(200);
        expect(element.offsetHeight).equals(200);
        expect(element.offsetLeft).equals(0);
        expect(element.offsetTop).equals(0);

        let scrollable = element.querySelector('.react-container-container-scrollable') as HTMLElement;
        expect(scrollable).to.exist;

        expect(scrollable.scrollWidth).equals(300);
        expect(scrollable.scrollHeight).equals(280);

        let content = element.querySelector('.react-container-content') as HTMLElement;
        expect(content).to.exist;
    });

    it('should fire onScrollPosChanged event when it is scrolled', () => {
        let handleScrollPosChanged = chai.spy((left: number, top: number) => { return; });

        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width = "200px"
                height = "200px"
                overflowX="auto" overflowY="auto"
                onScrollPosChanged={handleScrollPosChanged}>
                <div style={{left: '280px', top: '260px'}} className="divClass" />
            </ScrollableContainer>,
            div) as ScrollableContainer;

        expect(container).to.exist;

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        let scrollable = element!.querySelector('.react-container-container-scrollable');
        expect(element).to.exist;

        simulateScroll(scrollable!, 20, 10);

        expect(handleScrollPosChanged).to.have.been.called.once;
        expect(handleScrollPosChanged).to.have.been.called.with.exactly(20, 10);

        expect(container.state).to.exist;
    });

    it('should have scrollbars when contentWidth and contentHeight set up to values greater than width and height', () => {
        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width = "200px"
                height = "200px"
                overflowX="auto" overflowY="auto"
                contentHeight={300} contentWidth={400}
                />,
            div) as ScrollableContainer;

        expect(container).to.exist;
        expect(container.props.contentWidth).equals(400);
        expect(container.props.contentHeight).equals(300);

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        let scrollable = element!.querySelector('.react-container-container-scrollable');
        expect(scrollable).to.exist;

        expect(scrollable!.scrollWidth).equals(400);
        expect(scrollable!.scrollHeight).equals(300);
    });

    it('should have a horizontal scrollbar when contentWidth greater than width', () => {
        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width = "200px"
                height = "200px"
                overflowX="auto" overflowY="auto"
                contentWidth={400} />,
            div) as ScrollableContainer;

        expect(container).to.exist;

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        let scrollable = element!.querySelector('.react-container-container-scrollable') as HTMLElement;
        expect(scrollable).to.exist;

        expect(scrollable!.scrollHeight).equals(scrollable!.clientHeight);
        expect(scrollable!.scrollWidth).equals(400);
        expect(scrollable!.offsetHeight).equals(200);
    });

    it('should have a vertical scrollbar when contentHeight greater than height', () => {
        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width="200px"
                height="200px"
                overflowX="auto" overflowY="auto"
                contentHeight={400} />,
            div) as ScrollableContainer;

        expect(container).to.exist;

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        let scrollable = element!.querySelector('.react-container-container-scrollable') as HTMLElement;
        expect(scrollable).to.exist;

        expect(scrollable!.scrollWidth).equals(scrollable!.clientWidth);
        expect(scrollable!.scrollHeight).equals(400);
        expect(scrollable!.offsetWidth).equals(200);
    });

    it('should have the same dimensions as its applied in a style attribute', () => {
        ReactDOM.render(<ScrollableContainer id="container"
            width = "200px"
            height = "200px"
            overflowX="auto" overflowY="auto"/>,
            div);

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        expect(element!.clientWidth).equals(200);
        expect(element!.clientHeight).equals(200);
    });

    // TODO make this test working

    it('shoud be able to sync scroll bars of two containers', () => {
        class Comp extends React.Component<{}, { x: number, y: number }> {
            constructor(props: {}) {
                super(props);
                this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
                this.state = {
                    x: 0,
                    y: 0
                };
            }

            handleScrollPosChanged: (x: number, y: number) => void = (x, y) => {
                this.setState( {x, y} );
            }

            render(): JSX.Element {
                return (
                    <div>
                        <ScrollableContainer id="container1"
                            contentWidth={100}
                            contentHeight={100}
                            overflowX="auto" overflowY="auto"
                            onScrollPosChanged={this.handleScrollPosChanged}
                            scrollLeft={this.state.x}
                            scrollTop={this.state.y}
                            width={50}
                            height={50}
                        >
                        </ScrollableContainer>
                        <ScrollableContainer id="container2"
                            contentWidth={100}
                            contentHeight={100}
                            overflowX="auto" overflowY="auto"
                            onScrollPosChanged={this.handleScrollPosChanged}
                            scrollLeft={this.state.x}
                            scrollTop={this.state.y}
                            width={50}
                            height={50}
                        >
                        </ScrollableContainer>
                    </div>
                );
            }

        }

        let container = ReactDOM.render(
            <Comp />,
            div);

        expect(container).to.exist;

        let element1 = document.body.querySelector('#container1');
        expect(element1).to.exist;

        let scrollable1 = element1!.querySelector('.react-container-container-scrollable');
        expect(scrollable1).to.exist;

        simulateScroll(scrollable1!, 20, 10);

        let element2 = document.body.querySelector('#container2');
        expect(element2).to.exist;

        let scrollable2 = element2!.querySelector('.react-container-container-scrollable') as HTMLElement;
        expect(scrollable2).to.exist;

        expect(scrollable2!.scrollLeft).equals(20);
        expect(scrollable2!.scrollTop).equals(10);
    });

    it('should fire onVerticalScrollBarVisibilityChanged if ContentHeight greater than height', () => {
        let handleVerticalScrollVisibilityChanged = chai.spy((visible: boolean, thumbWidth: number) => {
            expect(visible).equal(true);
            expect(thumbWidth).to.be.greaterThan(0);
        });

        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width="200px"
                height="200px"
                overflowX="auto"
                overflowY="auto"
                contentHeight={400}
                onVerticalScrollVisibilityChanged={handleVerticalScrollVisibilityChanged} />,
            div) as ScrollableContainer;

        expect(container).to.exist;

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        let scrollable = element!.querySelector('.react-container-container-scrollable');
        expect(scrollable).to.exist;

        expect(handleVerticalScrollVisibilityChanged).to.have.been.called.once;
    });

    it('should fire onHorizontalScrollBarVisibilityChanged if ContentWidth greater than width', () => {
        let handleHorizontalScrollVisibilityChanged = chai.spy((visible: boolean, thumbWidth: number) => {
            expect(visible).equal(true);
            expect(thumbWidth).to.be.greaterThan(0);
        });

        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width="200px"
                height="200px"
                overflowX="auto"
                overflowY="auto"
                contentWidth={400}
                onHorizontalScrollVisibilityChanged={handleHorizontalScrollVisibilityChanged}/>,
            div) as ScrollableContainer;

        expect(container).to.exist;

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        let scrollable = element!.querySelector('.react-container-container-scrollable');
        expect(scrollable).to.exist;

        expect(handleHorizontalScrollVisibilityChanged).to.have.been.called.once;
    });

    it('should fire onHorizontalScrollBarVisibilityChanged if ContentWidth becomes less than width', () => {
        let handleHorizontalScrollVisibilityChanged = chai.spy((visible: boolean, thumbWidth: number) => {
            return;
        });

        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width="300px"
                height="300px"
                overflowX="auto"
                overflowY="auto"
                contentWidth={500}
                contentHeight={200}
                onHorizontalScrollVisibilityChanged={handleHorizontalScrollVisibilityChanged}/>,
            div) as ScrollableContainer;

        expect(container).to.exist;

        let element = document.body.querySelector('#container') as HTMLElement;

        expect(element.offsetWidth).equals(300);
        expect(element.offsetHeight).equals(300);

        element.style.width = '500px';
        container.handleWindowResize();

        expect(handleHorizontalScrollVisibilityChanged).to.have.been.called.twice;
        expect(handleHorizontalScrollVisibilityChanged).to.have.been.called.with(true);
        expect(handleHorizontalScrollVisibilityChanged).to.have.been.called.with(false, 0);
    });

    it('should fire onVerticalScrollBarVisibilityChanged if ContentHeight becomes less than height', () => {
        let handleVerticalScrollVisibilityChanged = chai.spy((visible: boolean, thumbHeight: number) => {
            return;
        });

        let container = ReactDOM.render(
            <ScrollableContainer id="container"
                width="300px"
                height="300px"
                overflowX="auto"
                overflowY="auto"
                contentWidth={200}
                contentHeight={500}
                onVerticalScrollVisibilityChanged={handleVerticalScrollVisibilityChanged} />,
            div) as ScrollableContainer;

        expect(container).to.exist;

        let element = document.body.querySelector('#container') as HTMLElement;

        expect(element.offsetWidth).equals(300);
        expect(element.offsetHeight).equals(300);

        element.style.height = '500px';
        container.handleWindowResize();

        expect(handleVerticalScrollVisibilityChanged).to.have.been.called.twice;
        expect(handleVerticalScrollVisibilityChanged).to.have.been.called.with(true);
        expect(handleVerticalScrollVisibilityChanged).to.have.been.called.with(false, 0);
    });

});
