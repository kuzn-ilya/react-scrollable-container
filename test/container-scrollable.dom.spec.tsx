import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';

import { ContainerScrollable } from '../sources/container/container-scrollable';

const expect = chai.expect;

describe('DOM: ContainerScrollable', () => {
    it('should have the same dimensions as its applied in a style attribute', () => {
        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.margin = '0px';

        let div = document.createElement('div');
        div.style.height = '100%';
        div.style.width = '100%';

        document.body.appendChild(div);

        ReactDOM.render(<ContainerScrollable id="container" style={{left: "40px", top: "40px", width: "200px", height: "200px"}} 
            overflowX="auto" overflowY="auto"/>,
            div);

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        expect(element).to.have.property('clientWidth', 200);
        expect(element).to.have.property('clientHeight', 200);
        expect(element).to.have.property('offsetLeft', 40);
        expect(element).to.have.property('offsetTop', 40);
    });

    it('!!!', () => {
        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.margin = '0px';

        let div = document.createElement('div');
        div.style.height = '100%';
        div.style.width = '100%';

        document.body.appendChild(div);

        ReactDOM.render(
            <ContainerScrollable id="container" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                overflowX="auto" overflowY="auto">
                <div style={{top: "260px", left: "280px", width: "20px", height: "20px", display: "inline-block", position: "absolute"}} />
            </ContainerScrollable>,
            div);

        let element = document.body.querySelector('#container');
        expect(element).to.exist;

        console.log(element);

        expect(element).to.have.property('offsetWidth', 300);
        expect(element).to.have.property('offsetHeight', 280);
        expect(element).to.have.property('offsetLeft', 40);
        expect(element).to.have.property('offsetTop', 40);
    });

});
