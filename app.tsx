import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Container } from './sources/container/container';

const component = (
    <Container style={{
        width: "100%",
        height: "90%"
    }}
        contentWidth={2190}
        contentHeight="auto"
        overflowX="auto"
        overflowY="auto"
    >
    </Container>
);

ReactDOM.render(component, document.getElementById('app'));
