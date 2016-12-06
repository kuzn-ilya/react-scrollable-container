import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.css';

import { ExamplesPage } from './ExamplesPage';
import { Example } from './Example';
import { GridExample } from './../grid/GridExample';

let examples: Example[] = [
    { componentClass: GridExample, name: 'PictureContainer' },
    { componentClass: GridExample, name: 'Grid' }
];

ReactDOM.render(<ExamplesPage examples={examples}/>, document.getElementById('app'));
