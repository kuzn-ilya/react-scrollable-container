import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.css';

import { ExamplesPage } from './ExamplesPage';
import { Example } from './Example';
import { GridExample } from './../grid/GridExample';

let examples: Example[] = [
    { name: 'PictureContainer', componentClass: GridExample },
    { name: 'Grid', componentClass: GridExample }
];

ReactDOM.render(<ExamplesPage examples={examples}/>, document.getElementById('app'));
