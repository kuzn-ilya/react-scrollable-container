import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as chai from 'chai';

import { ContainerScrollable } from '../sources/container/container-scrollable';

const expect = chai.expect;

describe('DOM: ContainerScrollable', () => {
    let div: HTMLDivElement = null;

    beforeEach(() => {
        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.margin = '0px';

        div = document.createElement('div');
        div.style.height = '100%';
        div.style.width = '100%';

        document.body.appendChild(div);
    });

    afterEach(() => {
        let divs = document.body.getElementsByTagName('div');
        for (let i = 0; i < divs.length; ++i) {
            document.body.removeChild(divs.item(i));
        }
    });

    it('should have the same dimensions as its applied in a style attribute', () => {
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
});
